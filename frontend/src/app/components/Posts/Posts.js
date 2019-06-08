import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import { logout, getPosts, saveMyProfile } from "../../../actions/blog.actions";
import Post from '../Post/Post';
import LeftProfile from '../LeftProfile/LeftProfile';
import AddPostComponent from '../AddPostComponent/AddPostComponent';
import request from "../../../services/requests";
import api, {updateHeader} from "../../../services/api";
import './Posts.css';

class Posts extends Component {

    state = {
        posts: [],
        comments: [],
        profile:{
            avatar: undefined,
            name: '',
            surname: '',
            user: {
                username: ''
            }
        }
    };

    componentDidMount() {
        console.log(api);
        if(api.defaults.headers.common["Authorization"]){
            request.getOwnProfile()
                .then(response => {
                    this.props.saveMyProfile(response);
                    request.getPosts()
                        .then(res => {
                            this.props.getPosts(res);
                            this.setState({
                                posts: this.props.posts,
                                isLoggedIn: true
                            })
                        })
                        .catch(res => {

                        });
                })
                .catch(response => {

                });
        }else {
            const token = localStorage.getItem('token');
            if(token){
                updateHeader('Authorization',`Token ${token}`);
                request.getOwnProfile()
                    .then(response => {
                        this.props.saveMyProfile(response);
                        request.getPosts()
                            .then(response => {
                                this.props.getPosts(response);
                                this.setState({
                                    posts: this.props.posts,
                                    isLoggedIn: true
                                })
                            });
                    })
                    .catch();
            }else{
                alert('Something wrong!');
                this.props.history.push('/login');
            }
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.posts !== this.props.posts){
            this.setState({
                posts: this.props.posts,
                comments: this.props.comments || [],
                profile: this.props.profile || this.state.profile
            });
        }
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
                    <div className="posts-main-child posts-left"><LeftProfile profile={this.state.profile}/></div>
                    <div className="posts-main-child posts-center">
                        <AddPostComponent/>
                        {
                            posts.map((post, index) => {
                                console.log(post, this.props.profile);
                                return <Post post={post} key = {index} profile={this.state.profile}/>
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
        comments: store.blog.comments,
        profile: store.blog.myProfile
    }
}
export default connect(mapStateToProps, { logout, getPosts, saveMyProfile })(Posts);
