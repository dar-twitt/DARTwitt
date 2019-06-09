import api from "./api";

export function getProfilesPost(profile, post){
    return api.get(`profile/${profile.id}/posts/${post.id}/`);
}


export function getProfilesPosts(profile){
    return api.get(`profile/${profile.id}/posts/`);
}

export function createProfilesPost(profile, post){
    return api.post(`profile/${profile.id}/create/`, post);
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

export function repostProfilesPost(profile, post){
    return api.post(`profile/${profile.id}/repost/${post.id}/`, {});
}

export function getFollowingsPosts(profile){
    return api.get(`profile/${profile.id}/fposts/`);
}
