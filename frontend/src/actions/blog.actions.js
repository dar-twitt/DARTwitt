import * as request from '../services/requests';
export const LOGIN = 'LOGIN';
export const GET_POSTS = 'GET_POSTS';

export const login = (username, password) => dispatch => {
    request.login(username, password)
        .then(response =>  {
            localStorage.setItem('token', response.data.token);
            dispatch({
                type: LOGIN,
                payload: response.data.token
            })
        })
        .catch(response => {
            alert('Something wrong. Try again!');
        })
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

        })
};
