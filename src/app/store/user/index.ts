/**
 * The type definition for a user object.
 */
export type UserType = {
  isActive: boolean
  blocked: boolean
  _id: string
  username: string
  registrationToken: string | null
  firstname: string
  lastname: string
  email: string
  __v: 0
  id: string
  role: string | []
  shortcuts?: []
  settings?: unknown
  loginRedirectUrl?: string
  photoURL?: string
  roles: [
    {
      id: string
      name: string
      description: string
      code: string
    },
  ]
}
