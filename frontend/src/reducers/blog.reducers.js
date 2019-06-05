import {LOGIN, REGISTER_USER, CREATE_PROFILE, LOG_OUT, GET_POSTS} from '../actions/blog.actions';

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
                status: action.payload.status
            };
        case CREATE_PROFILE:
            return {
                ...state,
                profile: action.payload
            };
        case LOG_OUT:
            return {
                ...state,
                token: null,
                profile: null
            };
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload
            };
        default:
            return state;
    }
}
