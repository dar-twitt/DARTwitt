import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import { logout, getPosts, saveMyProfile } from "../../../actions/blog.actions";
import Post from '../Post/Post';
import LeftProfile from '../LeftProfile/LeftProfile';
import AddPostComponent from '../AddPostComponent/AddPostComponent';
import request from "../../../services/requests";
import {updateHeader} from "../../../services/api";
import './Posts.css';

class Posts extends Component {

    state = {
        posts: [],
        //isLoggedIn: false
    };

    componentDidMount() {
        request.getPosts()
            .then(response => {
                this.props.getPosts(response);
                this.setState({
                    posts: this.props.posts,
                    isLoggedIn: true
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
                                posts: this.props.posts,
                                isLoggedIn: true
                            })
                        })

                }else{
                    alert('Something wrong!');
                    this.props.history.push('/login');
                }
            });
        request.getOwnProfile()
            .then(response => {
                this.props.saveMyProfile(response);
            })
            .catch(response => {
                const token = localStorage.getItem('token');
                if(token){
                    updateHeader('Authorization',`Token ${token}`);
                    request.getOwnProfile()
                        .then(response => {
                            this.props.saveMyProfile(response);
                        })
                        .catch();
                }else{
                    alert('Something wrong!');
                    this.props.history.push('/login');
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
            <div className = "PostsComponent ">
                <nav className="posts-nav">
                    <Link  className = "nav__link" to="/profile">Profile</Link>
                    <div className="nav__link">
                        <input type="text"/>
                    </div>
                    <Link className = "nav__link" to="/" onClick={this.handleLogoutClick}>Logout</Link>
                </nav>
                <div className="posts-main">
                    {/*<div className="posts-main-child posts-left"><LeftProfile/></div>*/}
                    <div className="posts-main-child posts-center">
                        <AddPostComponent/>
                        {
                            posts.map((post, index) => {
                                return <Post post={post} key = {index}/>
                            })
                        }
                        <br/>
                    </div>
                    {/*<div className="posts-main-child posts-right">Right</div>*/}
                </div>
            </div>
        );
    }
}

export function mapStateToProps(store){
    return {
        posts: store.blog.posts,
    }
}
export default connect(mapStateToProps, { logout, getPosts, saveMyProfile })(Posts);
