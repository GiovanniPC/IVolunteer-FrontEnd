const INITIAL_STATE = { accountdata: '', type:'' }

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {

      case 'VOLUNTEER_PROFILE':
        return { ...state, accountdata: action.payload, type: 'volunteer' }
      case 'ONG_PROFILE':
        return{ ...state, accountdata: action.payload, type: 'ong' }
      default:
        return state
    }
  }