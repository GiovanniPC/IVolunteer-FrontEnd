import { combineReducers } from 'redux';
import AuthReducer from '../services/reducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    auth: AuthReducer,
    routing: routerReducer
})

export default rootReducer