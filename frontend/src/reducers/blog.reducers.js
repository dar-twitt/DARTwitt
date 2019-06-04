import { LOGIN } from '../actions/blog.actions';

const initialState = {};

export default function(state=initialState, action){
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                token: action.payload
            };
        default:
            return state;
    }
}
