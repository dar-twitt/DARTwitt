import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import { logout, getPosts } from "../../../actions/blog.actions";
import Post from '../Post/Post';
import LeftProfile from '../LeftProfile/LeftProfile';
import * as request from "../../../services/requests";
class Posts extends Component {

    state = {
        posts: []
    };

    componentDidMount() {
        const { token } = this.props;
        request.getPosts(token)
            .then(response => {
                this.props.getPosts(response);
                this.setState({
                    posts: this.props.posts
                })
            })
            .catch(response => {
                alert('Something Wrong');
            })
    }

    handleLogoutClick = () => {
        const { token } = this.props;
        request.logout(token)
            .then(response => {
                localStorage.removeItem('token');
                this.props.logout(response);
            })
            .catch(response => {
                alert('Something wrong!');
            });
    };

    render() {
        const { posts } = this.state;
        return (
            <div className = "PostsComponent">
                <nav className="posts-nav">
                    <Link className = "nav__link" to="/" onClick={this.handleLogoutClick}>Logout</Link>
                </nav>
                <div className="posts-main">
                    <div className="posts-left"><LeftProfile/></div>
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
