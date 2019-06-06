import api from "./api";

export function deletePostsComment(post, comment){
    return api.delete(`post/${post.id}/comment/${comment.id}/`);
}

export function getPostsComments(post){
    return api.get(`post/${post.id}/comment/`, {});
}

export function createPostsComment(post, text){
    return api.post(`post/${post.id}/comment/`, {
        text: text
    })
}

export function getPostsComment(post, comment){
    return api.get(`post/${post.id}/comment/${comment.id}/`, {});
}

export function updatePostsComment(post, comment){
    return api.put(`post/${post.id}/comment/${comment.id}/`, {
        text: comment.text
    });
}
