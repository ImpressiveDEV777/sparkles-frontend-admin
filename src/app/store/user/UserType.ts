/**
 * The type definition for a user object.
 */
export type UserType = {
  _id: string
  username: string
  email: string
  role: string | []
  shortcuts?: []
  settings?: unknown
  photoURL?: string
  loginRedirectUrl?: string
}

export default UserType
