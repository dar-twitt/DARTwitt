export const LOGIN = 'LOGIN';
export const GET_POSTS = 'GET_POSTS';
export const REGISTER_USER = 'REGISTER_USER';
export const CREATE_PROFILE = 'CREATE_PROFILE';
export const LOG_OUT = 'LOG_OUT';

export const login = (response) => dispatch => {
    localStorage.setItem('token', response.data.token);
    dispatch({
        type: LOGIN,
        payload: response.data
    });
};

export const logout = response => dispatch => {
    localStorage.removeItem('token');
    dispatch({
        type: LOG_OUT,
        payload: {}
    });
};

export const getPosts = response => dispatch => {
    console.log(response.data);
    dispatch({
        type: GET_POSTS,
        payload: response.data
    });
};

export const register = response => dispatch => {
    dispatch({
        type: REGISTER_USER,
        payload: {
            status: 'registered',
            currentUser: response.data
        }
    });
};

export const createProfile = response => dispatch => {
    dispatch({
        type: CREATE_PROFILE,
        payload: {
            profile: response.data
        }
    })
};
