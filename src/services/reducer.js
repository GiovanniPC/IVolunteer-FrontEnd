const INITIAL_STATE = { token:'', auth: null, tipo:'', accountdata:'', areas:'' }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {

      case 'USER_LOGIN':
        return { ...state, token: action.payload.token, auth: true, tipo: action.payload.tipo }
   
        case 'USER_DATA':
          if(action.payload.data.volunteer){
          return { ...state, accountdata: action.payload.data.volunteer, areas: action.payload.data }
          }
          else{
            return { ...state, accountdata: action.payload.data }
          }
      case 'USER_LOGOUT':
        return { ...state, token: '', auth: null }

      default:
        return state
    }
  }