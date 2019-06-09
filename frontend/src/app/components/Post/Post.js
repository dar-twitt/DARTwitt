import React, {Component} from 'react';
import './Post.css';
import request from '../../../services/requests';
import {connect} from "react-redux";
import WriteCommentComponent from '../WriteCommentComponent/WriteCommentComponent';
import {getMyPosts, getPosts, saveMyProfile, getProfilesPosts} from "../../../actions/blog.actions";
import * as moment from 'moment';
import api, {updateHeader} from "../../../services/api";

class Post extends Component {

    state = {
        post: this.props.post,
        text: this.props.post.post.text,
        like: null,
        isLiked: false,
        onShow: false,
        onEdit: false,
        isRePosted: false,
        profile: {
            user: {
                username: '',
                password: ''
            }
        }
    };


    formatDate(date) {
        return moment(date).format('YYYY-MM-DDThh:mm');
    }

    componentDidMount() {
        if(api.defaults.headers.common['Authorization']){
            request.getOwnProfile()
                .then(res => {
                    this.props.saveMyProfile(res);
                })
                .catch();
        }
        this.checkForLikes();
        this.checkForRePosts();
    }

    checkForLikes = () => {
        const { profile } = this.props;
        const { post } = this.props;
        if(profile){
            const { likes } = post;
            for(let i = 0; i < likes.length; i++){
                if(likes[i].owner.user.username === profile.user.username){
                    this.setState({
                        isLiked: true,
                        like: likes[i]
                    });
                    break;
                }
            }
        }
    };

    checkForRePosts = () => {
        const { post } = this.props;
        const { profile } = this.props;
        if(profile && (profile.user.username === post.post.owner.user.username)) {
            this.setState({
                isRePosted: true
            });
        }

    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props!== prevProps){
            this.checkForLikes();
            this.checkForRePosts();
            this.setState({
                post: this.props.post,
                profile: this.props.profile || this.state.profile
            });
        }
    }

    handleOnLikeClick = () => {
        if(this.state.isLiked && this.state.like){
            request.deletePostsLike(this.props.post.post, this.state.like)
                .then(response => {
                    if(this.props.profile){
                        request.getFollowingsPosts(this.props.profile)
                            .then(res => {
                                this.props.getPosts(res);
                            })
                            .catch(res => {

                            });
                    }
                    if(this.props.another){
                        request.getProfilesPosts(this.props.another)
                            .then(res => {
                                this.props.getProfilesPosts(res);
                            })
                            .catch();
                    }
                    this.setState({
                        isLiked: false,
                        like: null
                    });
                })
                .catch();
        } else {
            request.createPostsLike(this.props.post.post)
                .then(response => {
                    if(this.props.profile){
                        request.getFollowingsPosts(this.props.profile)
                            .then(res => {
                                this.props.getPosts(res);
                            })
                            .catch(res => {

                            });
                    }
                    if(this.props.another){
                        request.getProfilesPosts(this.props.another)
                            .then(res => {
                                this.props.getProfilesPosts(res);
                            })
                            .catch();
                    }
                    this.setState({
                        isLiked: true,
                        like: response.data
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
        request.deleteProfilesPost(this.props.profile, this.props.post.post)
            .then(response => {
                if(this.props.profile){
                    request.getFollowingsPosts(this.props.profile)
                        .then(res => {
                            this.props.getPosts(res);
                        })
                        .catch(res => {

                        });
                }
                request.getProfilesPosts(this.props.profile)
                    .then(res=> {
                        this.props.getMyPosts(res);
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
        request.updateProfilesPost(this.props.profile, post.post)
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

    handleRePostClick = () => {
        const { profile } = this.props;
        const { post } = this.props.post;
        if(profile){
            updateHeader('Content-Type', 'multipart/form-data');
            request.repostProfilesPost(profile, post)
                .then(r => {
                    if(this.props.profile){
                        request.getFollowingsPosts(this.props.profile)
                            .then(res => {
                                this.props.getPosts(res);
                            })
                            .catch(res => {

                            });
                    }
                    if(this.props.another){
                        request.getProfilesPosts(this.props.another)
                            .then(res => {
                                this.props.getProfilesPosts(res);
                            })
                            .catch();
                    }
                    this.setState({
                        isRePosted: true
                    });
                })
                .catch();
        }
    };

    render() {
        const { post } = this.state;
        const { profile }= this.state;
        return (
            <div className="PostComponent">
                <div className="post-user"><span>{`${post.post.owner.name} ${post.post.owner.surname} @${post.post.owner.user.username}`}</span>
                    {
                        post.post.repost && <span>{`Reposted from @${post.post.repost.user.username}`}</span>
                    }
                    <span>
                        {
                            post.post.owner.user.username === profile.user.username && !this.state.onEdit
                            && <span className="edit-post" onClick={this.handleOnEditClick}>Edit</span>
                        }
                        {
                            post.post.owner.user.username === profile.user.username && this.state.onEdit &&
                            <span className="edit-post" onClick={this.handleOnSaveClick}>Save</span>
                        }
                        {
                            post.post.owner.user.username === profile.user.username
                            && <span className="delete-post" onClick={this.handleOnDeleteClick}>Delete</span>
                        }
                    </span>
                </div>
                <div className="post-content">
                    {
                        post.post.image && <img src={post.post.image} alt="" className="post_image__wrapper"/>
                    }
                    {
                        this.state.onEdit &&
                            <input type="text" className="post-content-text" value={`${this.state.text}`} onChange={this.handleOnChange}/>
                    }
                    {
                        !this.state.onEdit &&
                        <div className="post-content-text">{`${this.state.text}`}</div>
                    }
                </div>
                <hr className="hr"/>
                <div className="post-bottom">
                    <div className={`post-bottom-child like ${this.state.isLiked && "liked"}`}>
                        <i className="icon-heart4 ico" onClick={this.handleOnLikeClick}> </i>
                        {`  ${post.likes.length}  `}
                    </div>
                    <div className="post-bottom-child comment"><i className="icon-blog ico" onClick={this.handleOnCommentsClick}> </i>
                        {` ${post.comments.length}`}
                    </div>
                    {
                        !this.state.isRePosted && <div className="post-bottom-child repost">
                            <i className="icon-repeat ico" onClick={this.handleRePostClick}>
                            </i>
                        </div>
                    }
                </div>
                <hr className="hr"/>
                <WriteCommentComponent post = {this.props.post.post}/>
                {
                    this.state.onShow && (!!post.comments.length) && <div className="comments">
                        <div className="comments-content">
                            {
                                post.comments.map(item =>{
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
        another: store.blog.profile
    };
}

export default connect(mapStateToProps, { getPosts, getMyPosts, saveMyProfile, getProfilesPosts })(Post);
