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
  __v?: number
  id: string
  role?: string[] | string | null
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

export default UserType
