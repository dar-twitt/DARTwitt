import {
    LOGIN,
    REGISTER_USER,
    SAVE_PROFILE,
    LOG_OUT,
    GET_POSTS,
    GET_CURRENT_USER,
    UPDATE_TOKEN
} from '../actions/blog.actions';

const initialState = {};

export default function(state=initialState, action){
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                token: action.payload.token
            };
        case REGISTER_USER:
            return {
                ...state,
                status: action.payload.status,
            };
        case SAVE_PROFILE:
            return {
                ...state,
                profile: action.payload.profile
            };
        case LOG_OUT:
            return {
                ...state,
                token: null,
                profile: null,
                posts: []
            };
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload.posts
            };
        case GET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload.currentUser
            };
        case UPDATE_TOKEN:
            return {
                ...state,
                token: action.payload.token
            };
        default:
            return state;
    }
}
