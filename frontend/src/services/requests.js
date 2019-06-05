import axios from 'axios';

export function login(username, password){
    return axios.post('http://localhost:8000/user/login/', {
        username: username,
        password: password
    })
}

export function logout(token){
    console.log(token);
    // return axios({
    //     method: 'POST',
    //     url: 'http://localhost:8000/user/logout/',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': token
    //     },
    //     data: {},
    //     json: true
    // });
    return axios.post('http://localhost:8000/user/logout/',{}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
    });
}

export function getProfiles(token){
    return axios.get('http://localhost:8000/profile/', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });
}

export function createProfile(token, name, surname){
    return axios.post('http://localhost:8000/profile/', {
            name: name,
            surname: surname
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }
    );
}

export function updateProfile(profile){
    return axios.put(`http://localhost:8000/profile/${profile.id}/`, {
        bio: profile.bio,
        name: profile.name,
        surname: profile.surname
    });
}

export function deleteProfile(profile){
    return axios.delete(`http://localhost:8000/profile/${profile.id}/`, {});
}

export function getProfilesPosts(profile){
    return axios.get(`http://localhost:8000/profile/${profile.id}/posts/`, {});
}

export function createProfilesPost(profile){
    return axios.post(`http://localhost:8000/profile/${profile.id}/posts/`, {});
}

export function getPosts(token){
    return axios.get(`http://localhost:8000/post/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });
}

export function getProfilesPost(profile, post){
    return axios.get(`http://localhost:8000/profile/${profile.id}/posts/${post.id}/`, {});
}

export function updateProfilesPost(profile, post){
    return axios.put(`http://localhost:8000/profile/${profile.id}/posts/${post.id}/`, {
        text: post.text
    });
}

export function deleteProfilesPost(profile, post){
    return axios.delete(`http://localhost:8000/profile/${profile.id}/posts/${post.id}/`, {});
}

export function getPost(post){
    return axios.get(`http://localhost:8000/post/${post.id}/`, {});
}

export function getPostsLikes(post){
    return axios.get(`http://localhost:8000/post/${post.id}/like/`, {});
}

export function createPostsLike(post){
    return axios.post(`http://localhost:8000/post/${post.id}/like/`, {});
}

export function getPostsLike(post, like){
    return axios.get(`http://localhost:8000/post/${post.id}/like/${like.id}/`, {});
}

export function deletePostsLike(post, like){
    return axios.delete(`http://localhost:8000/post/${post.id}/like/${like.id}/`, {});
}

export function getPostsComments(post){
    return axios.get(`http://localhost:8000/post/${post.id}/comment/`, {});
}

export function createPostsComment(post, text){
    return axios.post(`http://localhost:8000/post/${post.id}/comment/`, {
        text: text
    })
}

export function getPostsComment(post, comment){
    return axios.get(`http://localhost:8000/${post.id}/comment/${comment.id}/`, {});
}

export function updatePostsComment(post, comment){
    return axios.put(`http://localhost:8000/${post.id}/comment/${comment.id}/`, {
        text: comment.text
    });
}

export function deletePostsComment(post, comment){
    return axios.delete(`http://localhost:8000/${post.id}/comment/${comment.id}/`, {});
}

export function getProfilesFollowers(profile){
    return axios.get(`http://localhost:8000/${profile.id}/followers/`, {});
}

export function getProfileFollowing(profile){
    return axios.get(`http://localhost:8000/${profile.id}/following/`, {});
}

export function followProfile(yourProfile, anotherProfile){
    return axios.post(`http://localhost:8000/${yourProfile.id}/follow/${anotherProfile.id}`, {});
}

export function unfollowProfile(yourProfile, anotherProfile){
    return axios.delete(`http://localhost:8000/${yourProfile.id}/follow/${anotherProfile.id}`, {});
}

export function registerUser(username, password, email){
    return axios.post('http://localhost:8000/user/register/', {
        username: username,
        password: password,
        email: email
    });
}

