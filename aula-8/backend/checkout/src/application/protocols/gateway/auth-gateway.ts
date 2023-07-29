export default interface AuthGateway {
  verifySession(token: string): Promise<{
    email?: string
    isValid: boolean
  }>
}
