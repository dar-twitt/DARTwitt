export const LOGIN = 'LOGIN';
export const GET_POSTS = 'GET_POSTS';
export const REGISTER_USER = 'REGISTER_USER';
export const SAVE_PROFILE = 'CREATE_PROFILE';
export const LOG_OUT = 'LOG_OUT';
export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const SAVE_MY_PROFILE = 'SAVE_MY_PROFILE';
export const SAVE_MY_FOLLOWING = 'SAVE_MY_FOLLOWING';
export const SAVE_MY_FOLLOWERS = 'SAVE_MY_FOLLOWERS';

export const login = response => dispatch => {
    dispatch({
        type: LOGIN,
        payload: response.data
    });
};

export const logout = response => dispatch => {
    dispatch({
        type: LOG_OUT,
        payload: {}
    });
};

export const getPosts = response => dispatch => {
    console.log(response.data);
    dispatch({
        type: GET_POSTS,
        payload: {
            posts: response.data
        }
    });
};

export const register = response => dispatch => {
    dispatch({
        type: REGISTER_USER,
        payload: {
            status: 'registered'
        }
    });
};

export const createProfile = response => dispatch => {
    dispatch({
        type: SAVE_PROFILE,
        payload: {
            profile: response.data
        }
    })
};

export const getProfile = response => dispatch => {
    dispatch({
        type: SAVE_PROFILE,
        payload: {
            profile: response.data
        }
    })
};

export const getCurrentUser = response => dispatch => {
    dispatch({
        type: GET_CURRENT_USER,
        payload: {
            currentUser: response.data
        }
    })
};

export const updateToken = token => dispatch => {
    dispatch({
        type: UPDATE_TOKEN,
        payload: {
            token: token
        }
    })
};

export const saveMyProfile = response => dispatch => {
    dispatch({
        type: SAVE_MY_PROFILE,
        payload: {
            myProfile: response.data[0]
        }
    });
};


export const saveMyProfileFollowing = response => dispatch => {
    dispatch({
        type: SAVE_MY_FOLLOWING,
        payload: {
            myFollowing: response.data
        }
    });
};


export const saveMyProfileFollowers = response => dispatch => {
    dispatch({
        type: SAVE_MY_FOLLOWERS,
        payload: {
            myFollowers: response.data
        }
    });
};
