import axios from 'axios';

export function login(username, password){
    return axios.post('http://localhost:8000/user/login/', {
        username: username,
        password: password
    })
}

export function logout(){
    return axios.post('http://localhost:8000/user/logout/', {});
}

export function getProfiles(){
    return axios.post('http://localhost:8000/profile/', {});
}

export function createProfile(bio, name, surname){
    return axios.post('http://localhost:8000/profile/', {
        bio: bio,
        name: name,
        surname: surname
    });
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
        // headers:
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
