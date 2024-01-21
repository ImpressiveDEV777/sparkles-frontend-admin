import _ from '@lodash'
import { PartialDeep } from 'type-fest'
import UserType from 'app/store/user/UserType'

/**
 * Creates a new user object with the specified data.
 */
function UserModel(data: PartialDeep<UserType>): UserType {
  data = data || {}

  return _.defaults(data, {
    isActive: true,
    blocked: false,
    _id: '',
    registrationToken: '',
    firstname: '',
    lastname: '',
    __v: 0,
    id: '621eb92191e4190016114a3c',
    role: '',
    username: 'John Doe',
    email: 'johndoe@withinpixels.com',
    shortcuts: ['apps.calendar', 'apps.mailbox', 'apps.contacts', 'apps.tasks'],
    settings: {},
    data: {},
    roles: [
      {
        id: '621eb84091e4190016114927',
        name: 'Super Admin',
        description:
          'Super Admins can access and manage all features and settings.',
        code: 'strapi-super-admin',
      },
    ],
  })
}

export default UserModel
