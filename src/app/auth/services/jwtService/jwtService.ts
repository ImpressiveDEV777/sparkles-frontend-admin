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
    const authData = getAccessToken()

    if (!authData) {
      this.emit('onNoAccessToken')
      return
    }

    if (isAuthTokenValid(authData.token)) {
      _setSession(authData)
      this.emit('onAutoLogin', true)
    } else {
      _setSession(null)
      this.emit('onAutoLogout', 'token expired')
    }
  }

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
            const user: UserType = {
              ..._.pick(response.data.data.user, ['_id', 'username', 'email']),
              role: 'admin',
            }
            _setSession({ user, token: response.data.data.token })
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
  signInWithToken = () => {
    const authData = getAccessToken()
    _setSession(authData)
    return authData
  }

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

type AuthData = { token: string; user: UserType }
/**
 * Sets the session by storing the access token in the local storage and setting the default authorization header.
 */
function _setSession(data: AuthData) {
  if (data) {
    setAccessToken(data)
    axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
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
export function getAccessToken() {
  const authData = window.localStorage.getItem('jwt_token')
  return authData && (JSON.parse(authData) as AuthData)
}

/**
 * Sets the access token in the local storage.
 */
function setAccessToken(data: AuthData) {
  return window.localStorage.setItem('jwt_token', JSON.stringify(data))
}

/**
 * Removes the access token from the local storage.
 */
function removeAccessToken() {
  return window.localStorage.removeItem('jwt_token')
}

const instance = new JwtService()

export default instance
