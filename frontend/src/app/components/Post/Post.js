import React, {Component} from 'react';
import './Post.css';
import request from '../../../services/requests';
import {connect} from "react-redux";
class Post extends Component {




    // assignLikes = () => {
    //     let likes = [];
    //     request.getPostsLikes(this.props.post)
    //         .then(response => {
    //             likes = response.data;
    //         })
    //         .catch();
    //     return likes;
    // };

    state = {
        isLiked: false,
        likes: [],
        like: null,
        comments: [],
        onShow: false
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
                        if(like.owner === profile){
                            isLiked = true;
                            this.setState({
                                isLiked: true,
                                like: like
                            });
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
    //     if(this.state !== prevState){
    //         this.checkForLikes();
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

    render() {
        const { post } = this.props;
        // const imageStyle = {
        //     background: `url(${post.image})`,
        // };
        return (
            <div className="PostComponent">
                <div className="post-user">{`${post.owner.name} ${post.owner.surname} @${post.owner.user.username}`}</div>
                <div className="post-content">
                    {
                        post.image && <img src={post.image} alt="" className="image__wrapper"/>
                    }
                    <div className="post-content-text">{`${post.text}`}</div>
                </div>
                <hr className="hr"/>
                <div className="post-bottom">
                    <div className={`post-bottom-child like ${this.state.isLiked && "liked"}`}>
                        <i className="icon-heart4 ico" onClick={this.handleOnLikeClick}></i>{`  ${this.state.likes.length}  `}</div>
                    <div className="post-bottom-child comment"><i className="icon-blog ico" onClick={this.handleOnCommentsClick}></i>{` ${this.state.comments.length}`}</div>
                    {/*<div className="post-bottom-child repost"><i className="icon-repeat ico"></i></div>*/}
                </div>
                {
                    this.state.onShow && (this.state.comments.length ? true : false) && <div className="comments">
                        <div className="comments-content">
                            {
                                this.state.comments.map(item =>{
                                    return <div>{item.text}</div>
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
        profile: store.blog.profile
    };
}

export default connect(mapStateToProps, {})(Post);
