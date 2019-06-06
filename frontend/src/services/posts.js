import api from "./api";

export function getProfilesPost(profile, post){
    return api.get(`profile/${profile.id}/posts/${post.id}/`);
}

export function updateProfilesPost(profile, post){
    return api.put(`profile/${profile.id}/posts/${post.id}/`, {
        text: post.text
    });
}

export function deleteProfilesPost(profile, post){
    return api.delete(`profile/${profile.id}/posts/${post.id}/`);
}

export function getPosts(){
    return api.get(`http://localhost:8000/post/`);
}

export function getPost(post){
    return api.get(`http://localhost:8000/post/${post.id}/`, {});
}


