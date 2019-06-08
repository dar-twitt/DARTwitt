import React, {Component} from 'react';
import './Post.css';
import request from '../../../services/requests';
import {connect} from "react-redux";
import WriteCommentComponent from '../WriteCommentComponent/WriteCommentComponent';
import { getPosts } from "../../../actions/blog.actions";

class Post extends Component {

    state = {
        post: this.props.post,
        isLiked: false,
        likes: [],
        like: null,
        comments: [],
        onShow: false,
        onEdit: false,
        text: this.props.post.text
    };

    componentDidMount() {
        this.checkForLikes();
        this.getComments();
    }

    checkForLikes = () => {
        let isLiked = false;
        request.getPostsLikes(this.props.post)
            .then(response => {
                const { profile } = this.props;
                if(profile){
                    const likes = response.data;
                    for(let like in likes){
                        console.log(like.owner);
                        console.log(profile);
                        if(like.owner === profile){ //fix
                            isLiked = true;
                            this.setState({
                                isLiked: true,
                                like: like
                            });
                            break;
                        }
                    }
                }
                this.setState({
                    likes: response.data
                })
            })
            .catch(response => {

            });
        return isLiked;
    };

    getComments = () => {
        request.getPostsComments(this.props.post)
            .then(response => {
                this.setState({
                    comments: response.data
                })
            })
            .catch();
    };

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(this.props!== prevProps){
    //         this.setState({
    //             comments: this.props.comments || []
    //         });
    //     }
    // }

    handleOnLikeClick = () => {
        if(this.state.isLiked && this.state.like){
            request.deletePostsLike(this.props.post, this.state.like)
                .then(response => {
                    request.getPostsLikes(this.props.post)
                        .then(response => {
                            this.setState({
                                isLiked: false,
                                like: null,
                                likes: response.data
                            });
                        });

                })
                .catch();
        } else {
            request.createPostsLike(this.props.post)
                .then(response => {
                    request.getPostsLikes(this.props.post)
                        .then(res => {
                            this.setState({
                                isLiked: true,
                                like: response.data,
                                likes: res.data
                            });
                        });
                })
                .catch(response => {});
        }
    };

    handleOnCommentsClick = () => {
        this.setState({
            onShow: !this.state.onShow
        });
    };

    handleOnDeleteClick = () => {
        request.deleteProfilesPost(this.props.profile, this.props.post)
            .then(response => {
                request.getPosts()
                    .then(res => {
                        this.props.getPosts(res);
                    })
                    .catch();
            })
            .catch();
    };

    handleOnEditClick = () => {
        this.setState({
            onEdit: true
        });
    };

    handleOnSaveClick = () => {
        const { post } = this.state;
        post.text = this.state.text;
        request.updateProfilesPost(this.props.profile, post)
            .then(response => {
                this.setState({
                    onEdit: false
                });
            })
            .catch();
    };

    handleOnChange = e => {
        this.setState({
            text: e.target.value
        });
    };

    render() {
        const { post } = this.state;
        return (
            <div className="PostComponent">
                <div className="post-user"><span>{`${post.owner.name} ${post.owner.surname} @${post.owner.user.username}`}</span>
                    <span>
                        {
                            post.owner.user.username === this.props.profile.user.username && !this.state.onEdit
                            && <span className="edit-post" onClick={this.handleOnEditClick}>Edit</span>
                        }
                        {
                            post.owner.user.username === this.props.profile.user.username && this.state.onEdit &&
                            <span className="edit-post" onClick={this.handleOnSaveClick}>Save</span>
                        }
                        {
                            post.owner.user.username === this.props.profile.user.username
                            && <span className="delete-post" onClick={this.handleOnDeleteClick}>Delete</span>
                        }
                    </span>
                </div>
                <div className="post-content">
                    {
                        post.image && <img src={post.image} alt="" className="post_image__wrapper"/>
                    }
                    {
                        this.state.onEdit &&
                            <input type="text" className="post-content-text" value={`${this.state.text}`} onChange={this.handleOnChange}/>
                    }
                    {
                        !this.state.onEdit &&
                        <div className="post-content-text">{`${post.text}`}</div>
                    }
                </div>
                <hr className="hr"/>
                <div className="post-bottom">
                    <div className={`post-bottom-child like ${this.state.isLiked && "liked"}`}>
                        <i className="icon-heart4 ico" onClick={this.handleOnLikeClick}> </i>
                        {`  ${this.state.likes.length}  `}
                    </div>
                    <div className="post-bottom-child comment"><i className="icon-blog ico" onClick={this.handleOnCommentsClick}> </i>
                        {` ${this.state.comments.length}`}
                    </div>
                    {/*<div className="post-bottom-child repost"><i className="icon-repeat ico"></i></div>*/}
                </div>
                <WriteCommentComponent post = {this.props.post}/>
                {
                    this.state.onShow && (!!this.state.comments.length) && <div className="comments">
                        <div className="comments-content">
                            {
                                this.state.comments.map(item =>{
                                    return <div className="comment-content">{item.text}  by <span>@{item.owner.user.username}</span></div>
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export function mapStateToProps(store){
    return {
        profile: store.blog.myProfile,
        comments: store.blog.comments
    };
}

export default connect(mapStateToProps, { getPosts })(Post);
