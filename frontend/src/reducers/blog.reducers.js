import {
    LOGIN,
    REGISTER_USER,
    SAVE_PROFILE,
    CREATE_PROFILE,
    LOG_OUT,
    GET_POSTS,
    GET_CURRENT_USER,
    UPDATE_TOKEN,
    SAVE_MY_PROFILE,
    SAVE_MY_FOLLOWING,
    SAVE_MY_FOLLOWERS,
    SAVE_IMAGE,
    GET_POSTS_COMMENTS,
    RESET_POSTS,
    GET_MY_POSTS, RESET_IMAGE
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
        case CREATE_PROFILE:
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
        case RESET_POSTS:
            return {
                ...state,
                posts: []
            };
        case GET_MY_POSTS:
            return {
                ...state,
                myPosts: action.payload.myPosts
            };
        case RESET_IMAGE:
            return {
                ...state,
                file: null
            };
        case SAVE_PROFILE:
            return {
                ...state,
                profile: action.payload.profile
            };
        default:
            return state;
    }
}
