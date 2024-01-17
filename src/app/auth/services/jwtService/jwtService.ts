import FuseUtils from '@fuse/utils/FuseUtils'
import axios, { AxiosError, AxiosResponse } from 'axios'
import _ from '@lodash'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import UserType from 'app/store/user/UserType'
import { PartialDeep } from 'type-fest'
import jwtServiceConfig from './jwtServiceConfig'
/* eslint-disable camelcase, class-methods-use-this */

/**
 * The JwtService class is a utility class for handling JSON Web Tokens (JWTs) in the Fuse application.
 * It provides methods for initializing the service, setting interceptors, and handling authentication.
 */
class JwtService extends FuseUtils.EventEmitter {
  /**
   * Initializes the JwtService by setting interceptors and handling authentication.
   */
  init() {
    this.setInterceptors()
    this.handleAuthentication()
  }

  /**
   * Sets the interceptors for the Axios instance.
   */
  setInterceptors = () => {
    axios.interceptors.response.use(
      (response: AxiosResponse<unknown>) => response,
      (err: AxiosError) =>
        new Promise(() => {
          if (err?.response?.status === 401 && err.config) {
            // if you ever get an unauthorized response, logout the user
            this.emit('onAutoLogout', 'Invalid Token')
            _setSession(null)
          }
          throw err
        }),
    )
  }

  /**
   * Handles authentication by checking for a valid access token and emitting events based on the result.
   */
  handleAuthentication = () => {
    const token = getAccessToken()

    if (!token) {
      this.emit('onNoAccessToken')

      return
    }

    if (isAuthTokenValid(token)) {
      _setSession(token)
      this.emit('onAutoLogin', true)
    } else {
      _setSession(null)
      this.emit('onAutoLogout', 'token expired')
    }
  }

  /**
   * Creates a new user account.
   */
  createUser = (data: {
    username: UserType['username']
    password: string
    email: UserType['email']
  }) =>
    new Promise((resolve, reject) => {
      axios.post(jwtServiceConfig.signUp, data).then(
        (
          response: AxiosResponse<{
            user: UserType
            token: string
            error?: {
              type: 'email' | 'password' | `root.${string}` | 'root'
              message: string
            }[]
          }>,
        ) => {
          if (response.data.user) {
            _setSession(response.data.token)
            resolve(response.data.user)
            this.emit('onLogin', response.data.user)
          } else {
            reject(response.data.error)
          }
        },
      )
    })

  /**
   * Signs in with the provided email and password.
   */
  signInWithEmailAndPassword = (email: string, password: string) =>
    new Promise((resolve, reject) => {
      axios
        .post(jwtServiceConfig.signIn, {
          email,
          password,
        })
        .then(
          (
            response: AxiosResponse<{
              data: {
                user: UserType
                token: string
              }
            }>,
          ) => {
            _setSession(response.data.data.token)
            const user: UserType = {
              ..._.pick(response.data.data.user, ['_id', 'username', 'email']),
              role: 'admin',
            }
            this.emit('onLogin', user)
            resolve(user)
          },
        )
        .catch((error: AxiosError) => {
          reject(error.response.data)
        })
    })

  /**
   * Signs in with the provided provider.
   */
  signInWithToken = () =>
    new Promise<UserType>((resolve, reject) => {
      axios
        .get(jwtServiceConfig.accessToken, {
          data: {
            token: getAccessToken(),
          },
        })
        .then(
          (
            response: AxiosResponse<{
              data: { user: UserType; token: string }
            }>,
          ) => {
            _setSession(response.data.data.token)
            resolve({
              ..._.pick(response.data.data.user, ['_id', 'username', 'email']),
              role: 'admin',
            })
          },
        )
        .catch(() => {
          this.logout()
          reject(new Error('Failed to login with token.'))
        })
    })

  /**
   * Updates the user data.
   */
  updateUserData = (user: PartialDeep<UserType>) =>
    axios.post(jwtServiceConfig.updateUser, {
      user,
    })

  /**
   * Signs out the user.
   */
  logout = () => {
    _setSession(null)
    this.emit('onLogout', 'Logged out')
  }
}

/**
 * Sets the session by storing the access token in the local storage and setting the default authorization header.
 */
function _setSession(token: string | null) {
  if (token) {
    setAccessToken(token)
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    removeAccessToken()
    delete axios.defaults.headers.common.Authorization
  }
}

/**
 * Checks if the access token is valid.
 */
function isAuthTokenValid(token: string) {
  if (!token) {
    return false
  }
  const decoded = jwtDecode<JwtPayload>(token)
  const currentTime = Date.now() / 1000

  if (decoded.exp < currentTime) {
    // eslint-disable-next-line no-console
    console.warn('access token expired')
    return false
  }

  return true
}

/**
 * Gets the access token from the local storage.
 */
function getAccessToken() {
  return window.localStorage.getItem('jwt_token')
}

/**
 * Sets the access token in the local storage.
 */
function setAccessToken(token: string) {
  return window.localStorage.setItem('jwt_token', token)
}

/**
 * Removes the access token from the local storage.
 */
function removeAccessToken() {
  return window.localStorage.removeItem('jwt_token')
}

const instance = new JwtService()

export default instance
