import React, {Component} from 'react';
import {connect} from "react-redux";
import request from '../../../services/requests';
import { getPosts, getComments } from '../../../actions/blog.actions';
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
                request.getPosts()
                    .then(response => {
                        this.props.getPosts(response);
                        this.setState({
                            comment: ''
                        });
                    })
                    .catch();
                request.getPostsComments(post)
                    .then(response => {
                        this.props.getComments(response);
                    });
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
        profile: store.blog.myProfile
    }
}
export default connect(mapStateToProps, { getPosts, getComments })(WriteCommentComponent);
