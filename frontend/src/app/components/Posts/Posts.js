import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import { logout, getPosts } from "../../../actions/blog.actions";
import Post from '../Post/Post';
import LeftProfile from '../LeftProfile/LeftProfile';
import request from "../../../services/requests";
import {updateHeader} from "../../../services/api";
class Posts extends Component {

    state = {
        posts: []
    };

    componentDidMount() {
        request.getPosts()
            .then(response => {
                this.props.getPosts(response);
                this.setState({
                    posts: this.props.posts
                })
            })
            .catch(res => {
                const token = localStorage.getItem('token');
                if(token){
                    updateHeader('Authorization',`Token ${token}`);
                    request.getPosts()
                        .then(response => {
                            this.props.getPosts(response);
                            this.setState({
                                posts: this.props.posts
                            })
                        })
                }else{
                    alert('Something wrong!');
                    this.props.history.push('/welcome');
                }
            });
    }

    handleLogoutClick = () => {
        localStorage.clear();
        request.logout()
            .then(response => {
                this.props.logout(response);
                updateHeader('Authorization', '');
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
        posts: store.blog.posts
    }
}
export default connect(mapStateToProps, { logout, getPosts })(Posts);
