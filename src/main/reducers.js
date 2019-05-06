import { combineReducers } from 'redux';
import MenuReducer from '../components/menu/reducer';
import AuthReducer from '../services/reducer';
import ProfileReducer from '../pages/profile/reducer';
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
    menu: MenuReducer,
    auth: AuthReducer,
    profile: ProfileReducer,
    routing: routerReducer
})

export default rootReducer
