import * as request from '../services/requests';
export const LOGIN = 'LOGIN';


export const login = (username, password) => {
    request.login(username, password)
        .then(response => dispatch => {
            dispatch({
                type: LOGIN,
                payload: response.data
            })
        })
        .catch(response => {
            alert('Something wrong!');
        })
};

export const getPosts = () => {

};
