/**
 * Configuration object containing the authentication service API endpoints
 */
const jwtServiceConfig = {
  signIn: 'admin/login',
  signUp: 'auth/local/register',
  accessToken: 'api/auth/access-token',
  updateUser: 'api/auth/user/update',
}

export default jwtServiceConfig
