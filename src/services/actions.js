export const sendLogin = (data) => (
{
    type: 'USER_LOGIN', 
    payload: data
}
)

export const logout = () => (
  {
    type: 'USER_LOGOUT'
  }
)