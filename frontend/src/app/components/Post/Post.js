import React, {Component} from 'react';

class Post extends Component {
    render() {
        const { post } = this.props;
        return (
            <div>
                <div>{post.text}</div>
                <div>{post.created_at}</div>
            </div>
        );
    }
}

export default Post;
