import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import { logout, getPosts } from "../../../actions/blog.actions";
import Post from '../Post/Post';
class Posts extends Component {

    state = {
        posts: []
    };

    componentDidMount() {
        console.log(this.props.token);
        this.props.getPosts(this.props.token);
        this.setState({
            posts: this.props.posts
        });
    }

    handleLogoutClick = () => {
        this.props.logout(this.props.token);
    };

    render() {
        const { posts } = this.state;
        console.log(this.state);
        return (
            <div className = "PostsComponent">
                <nav className="posts-nav">
                    <Link className = "nav__link" to="/" onClick={this.handleLogoutClick}>Logout</Link>
                </nav>
                <div className="posts-main">
                    <div className="posts-left">Left</div>
                    <div className="posts-center">
                        {
                            posts.map((post, index) => {
                                return <Post post={post} key = {index}/>
                            })
                        }
                    </div>
                    <div className="posts-right">Right</div>
                </div>
            </div>
        );
    }
}
export function mapStateToProps(store){
    return {
        token: store.blog.token,
        posts: store.blog.posts
    }
}
export default connect(mapStateToProps, { logout, getPosts })(Posts);
