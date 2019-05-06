const INITIAL_STATE = { name: '', token:'', auth: null }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {

      case 'USER_LOGIN':
        return { ...state, token: action.payload, name: 'Gui', auth: true }

      case 'USER_LOGOUT':
        return { ...state, token: '', auth: null }
      default:
        return state
    }
  }