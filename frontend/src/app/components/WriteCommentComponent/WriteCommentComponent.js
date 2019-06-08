import React, {Component} from 'react';
import {connect} from "react-redux";
import request from '../../../services/requests';

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
                <button className="comment-send">Comment</button>
            </div>
        );
    }
}
export function mapStateToProps(store){
    return{
        profile: store.blog.myProfile
    }
}
export default connect(mapStateToProps, {})(WriteCommentComponent);
