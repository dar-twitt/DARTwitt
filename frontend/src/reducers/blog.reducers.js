import {
    LOGIN,
    REGISTER_USER,
    SAVE_PROFILE,
    LOG_OUT,
    GET_POSTS,
    GET_CURRENT_USER,
    UPDATE_TOKEN, SAVE_MY_PROFILE, SAVE_MY_FOLLOWING, SAVE_MY_FOLLOWERS, SAVE_IMAGE, GET_POSTS_COMMENTS
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
        case SAVE_MY_PROFILE:
            return {
                ...state,
                myProfile: action.payload.myProfile
            };
        case SAVE_MY_FOLLOWING:
            return {
                ...state,
                myFollowing: action.payload.myFollowing
            };
        case SAVE_MY_FOLLOWERS:
            return {
                ...state,
                myFollowers: action.payload.myFollowers
            };
        case SAVE_IMAGE:
            return {
                ...state,
                file: action.payload.file
            };
        case GET_POSTS_COMMENTS:
            return {
                ...state,
                comments: action.payload.comments
            };
        default:
            return state;
    }
}
