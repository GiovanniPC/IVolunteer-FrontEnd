export const sendLogin = (request) => (
  {
    type: 'USER_LOGIN', 
    payload: request
}
)

export const userData = (request) => (
  {
  type: 'USER_DATA',
  payload: request
})
export const logout = () => (
  {
    type: 'USER_LOGOUT'
  }
)