import React, {Component} from 'react';
import './Post.css';

class Post extends Component {
    render() {
        const { post } = this.props;
        const imageStyle = {
            background: `url(${post.image})`
        };
        return (
            <div className="PostComponent">
                <div className="post-user">{`${post.owner.name} ${post.owner.surname} @${post.owner.user.username}`}</div>
                <div className="post-content">
                    {
                        post.image && <div style = {imageStyle}></div>
                    }
                    <div>{`${post.text}`}</div>
                </div>
                <hr className="hr"/>
                <div className="post-bottom">
                    <div className="post-bottom-child like">Like</div>
                    <div className="post-bottom-child comment">Comment</div>
                    <div className="post-bottom-child repost">Repost</div>
                </div>
            </div>
        );
    }
}

export default Post;
