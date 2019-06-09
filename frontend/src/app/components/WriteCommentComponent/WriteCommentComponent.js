import React, {Component} from 'react';
import {connect} from "react-redux";
import request from '../../../services/requests';
import { getPosts, getMyPosts, getProfilesPosts } from '../../../actions/blog.actions';
import './WriteCommentComponent.css';
class WriteCommentComponent extends Component {
    state = {
        comment: '',
    };

    handleOnChange = event => {
        this.setState({
            comment: event.target.value
        });
    };

    handleSendComment = () => {
        const { post } = this.props;
        request.createPostsComment(post, this.state.comment)
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
            })
            .catch();
    };

    render() {
        return (
            <div className="WriteCommentComponent">
                <input type="text"
                       className="comment-input"
                       placeholder="Comment this post...."
                       value={this.state.comment}
                       onChange={this.handleOnChange}
                />
                <button className="comment-send" onClick={this.handleSendComment}>Comment</button>
            </div>
        );
    }
}
export function mapStateToProps(store){
    return{
        profile: store.blog.myProfile,
        another: store.blog.profile
    }
}
export default connect(mapStateToProps, { getPosts, getMyPosts, getProfilesPosts })(WriteCommentComponent);
