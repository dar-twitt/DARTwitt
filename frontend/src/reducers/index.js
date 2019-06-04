import { combineReducers } from "redux";
import blogReducer from './blog.reducers';

const appReducer = combineReducers({
    blog: blogReducer
});

export default appReducer;
