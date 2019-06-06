import api from './api';

export function login(username, password){
    return api.post('user/login/', {
        username: username,
        password: password
    });
}

export function logout(){
    return api.post('user/logout/', {});
}

export function getCurrentUser(token){
    return api.get('user/me/', {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });
}

export function registerUser(username, password, email){
    return api.post('user/register/', {
        username: username,
        password: password,
        email: email
    });
}
