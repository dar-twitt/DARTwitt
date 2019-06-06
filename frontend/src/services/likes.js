import api from "./api";

export function getPostsLikes(post){
    return api.get(`post/${post.id}/like/`, {});
}

export function createPostsLike(post){
    return api.post(`post/${post.id}/like/`, {});
}

export function getPostsLike(post, like){
    return api.get(`post/${post.id}/like/${like.id}/`, {});
}

export function deletePostsLike(post, like){
    return api.delete(`post/${post.id}/like/${like.id}/`, {});
}
