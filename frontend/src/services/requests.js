import * as auth from './auth';
import * as comments from  './comments';
import * as likes from './likes';
import * as posts from './posts';
import * as profiles from './profiles';

const request  = {
    ...auth,
    ...comments,
    ...likes,
    ...posts,
    ...profiles
};

export default request;
