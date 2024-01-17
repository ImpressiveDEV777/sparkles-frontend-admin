/*
eslint-disable camelcase
 */
import FuseUtils from '@fuse/utils'
import _ from '@lodash'
import Base64 from 'crypto-js/enc-base64'
import HmacSHA256 from 'crypto-js/hmac-sha256'
import Utf8 from 'crypto-js/enc-utf8'
import jwtDecode from 'jwt-decode'
import { PartialDeep } from 'type-fest'
import UserType from 'app/store/user/UserType'
import UserModel from 'app/store/user/models/UserModel'
import jwtServiceConfig from 'src/app/auth/services/jwtService/jwtServiceConfig'
import mock from '../mock'
import mockApi from '../mock-api.json'

type UserAuthType = UserType & { password: string }

let usersApi = mockApi.components.examples.auth_users.value as UserAuthType[]

mock.onGet(jwtServiceConfig.accessToken).reply((config) => {
  return [
    200,
    {
      data: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzI2N2Y1OTljZDFiMWU0ZjY0Mzc2MiIsImlhdCI6MTcwNTUzMTMzOSwiZXhwIjoxNzA4MTIzMzM5fQ.5Mydvx-FE-g8rOCS48xk5JZHeYnrjA1tcvGnjkqVQXI',
        user: {
          isActive: true,
          blocked: false,
          _id: '64c267f599cd1b1e4f643762',
          username: 'dany@gmail.com',
          registrationToken: null,
          firstname: 'Dany',
          lastname: 'R',
          email: 'dany@gmail.com',
          __v: 0,
          id: '64c267f599cd1b1e4f643762',
          roles: [
            {
              id: '621eb84091e4190016114927',
              name: 'Super Admin',
              description:
                'Super Admins can access and manage all features and settings.',
              code: 'strapi-super-admin',
            },
          ],
        },
      },
    },
  ]
})

mock.onPost('/api/auth/sign-up').reply((request) => {
  const data = JSON.parse(request.data as string) as {
    username: string
    password: string
    email: string
  }
  const { username, password, email } = data
  const isEmailExists = usersApi.find((_user) => _user.email === email)
  const error = []

  if (isEmailExists) {
    error.push({
      type: 'email',
      message: 'The email address is already in use',
    })
  }

  if (error.length === 0) {
    const newUser = UserModel({
      id: FuseUtils.generateGUID(),
      role: 'admin',
      password,
      data: {
        username,
        photoURL: 'assets/images/avatars/Abbott.jpg',
        email,
        settings: {},
        shortcuts: [],
      },
    } as UserAuthType) as UserAuthType

    usersApi = [...usersApi, newUser]

    const user = _.cloneDeep(newUser)

    delete (user as Partial<UserAuthType>).password

    const token = generateJWTToken({ id: user.id })

    const response = {
      user,
      token,
    }

    return [200, response]
  }
  return [200, { error }]
})

mock.onPost('/api/auth/user/update').reply((config) => {
  const token = config?.headers?.Authorization as string

  const userData = jwtDecode(token)
  const { id } = userData as { [key: string]: string }

  const data = JSON.parse(config.data as string) as {
    user: PartialDeep<UserAuthType>
  }
  const { user } = data

  let updatedUser: UserType

  usersApi = usersApi.map((_user) => {
    if (id === _user.id) {
      updatedUser = _.assign({}, _user, user)
    }
    return _user
  })

  delete (updatedUser as Partial<UserAuthType>).password

  return [200, updatedUser]
})

/**
 * JWT Token Generator/Verifier Helpers
 * !! Created for Demonstration Purposes, cannot be used for PRODUCTION
 */

const jwtSecret = 'some-secret-code-goes-here'

/* eslint-disable */

function base64url(source: CryptoJS.lib.WordArray) {
  // Encode in classical base64
  let encodedSource = Base64.stringify(source)

  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, '')

  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, '-')
  encodedSource = encodedSource.replace(/\//g, '_')

  // Return the base64 encoded string
  return encodedSource
}

function generateJWTToken(tokenPayload: { [key: string]: unknown }) {
  // Define token header
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  }

  // Calculate the issued at and expiration dates
  const date = new Date()
  const iat = Math.floor(date.getTime() / 1000)
  const exp = Math.floor(date.setDate(date.getDate() + 7) / 1000)

  // Define token payload
  const payload: unknown = {
    iat,
    iss: 'Fuse',
    exp,
    ...tokenPayload,
  }

  // Stringify and encode the header
  const stringifiedHeader = Utf8.parse(JSON.stringify(header))
  const encodedHeader = base64url(stringifiedHeader)

  // Stringify and encode the payload
  const stringifiedPayload = Utf8.parse(JSON.stringify(payload))
  const encodedPayload = base64url(stringifiedPayload)

  // Sign the encoded header and mock-api
  let signature = `${encodedHeader}.${encodedPayload}`
  // @ts-ignore
  signature = HmacSHA256(signature, jwtSecret)
  // @ts-ignore
  signature = base64url(signature)

  // Build and return the token
  return `${encodedHeader}.${encodedPayload}.${signature}`
}

function verifyJWTToken(token: string) {
  // Split the token into parts
  const parts = token.split('.')
  const header = parts[0]
  const payload = parts[1]
  const signature = parts[2]

  // Re-sign and encode the header and payload using the secret
  const signatureCheck = base64url(
    HmacSHA256(`${header}.${payload}`, jwtSecret),
  )

  // Verify that the resulting signature is valid
  return signature === signatureCheck
}
