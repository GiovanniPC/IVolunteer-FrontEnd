import {store} from '../main/store'

export const isAuthenticated = () => store.getState().auth.auth !== null;
export const getToken = () => store.getState().auth.token