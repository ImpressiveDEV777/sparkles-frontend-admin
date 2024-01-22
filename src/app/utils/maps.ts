import { User } from '../auth/user'
import { User as ResUser } from '../res-types/sub/User'

export const mapToUser = (user: ResUser): User => ({
  uid: user._id,
  role: 'admin',
  data: {
    displayName: user.username,
    email: user.email,
  },
})
