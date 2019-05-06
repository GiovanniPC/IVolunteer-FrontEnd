export const userData = (request) => {
    if(request.volunteer) return{type: 'VOLUNTEER_PROFILE', payload: request}
    else return{type: 'ONG_PROFILE', payload: request}
}