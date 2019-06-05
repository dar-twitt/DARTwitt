import * as request from '../services/requests';
export const LOGIN = 'LOGIN';
export const GET_POSTS = 'GET_POSTS';
export const REGISTER_USER = 'REGISTER_USER';
export const CREATE_PROFILE = 'CREATE_PROFILE';
export const LOG_OUT = 'LOG_OUT';

export const login = (username, password) => dispatch => {
    request.login(username, password)
        .then(response =>  {
            localStorage.setItem('token', response.data.token);
            dispatch({
                type: LOGIN,
                payload: response.data
            })
        })
        .catch(response => {
            alert('Something wrong. Try again!');
        })
};

export const register = (username, password, email) => dispatch => {
    request.registerUser(username, password, email)
        .then(response => {
            dispatch({
                type: REGISTER_USER,
                payload: {
                    status: 'registered'
                }
            });

        })
        .catch(response => {
            alert('User with such login already exist! Please, try again!');
        })
};

export const createProfile = (token, name, surname) => dispatch => {
    request.createProfile(token, name, surname)
        .then(response => {
            dispatch({
                type: CREATE_PROFILE,
                payload: {
                    profile: response.data
                }
            })
        })
};

export const logout = token => dispatch => {
    request.logout(token)
        .then(response => {
            localStorage.removeItem('token');
            dispatch({
                type: LOG_OUT,
                payload: {}
            });
        })
        .catch(response => {
            alert('Something wrong!');
        });
};

export const getPosts = token => dispatch => {
    request.getPosts(token)
        .then(response => {
            console.log(response.data);
            dispatch({
                type: GET_POSTS,
                payload: response.data
            })
        })
        .catch(response => {
            alert('Something Wrong');
        })
};
