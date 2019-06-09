import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import { logout, getPosts, saveMyProfile, resetPosts, saveProfile } from "../../../actions/blog.actions";
import Post from '../Post/Post';
import LeftProfile from '../LeftProfile/LeftProfile';
import AddPostComponent from '../AddPostComponent/AddPostComponent';
import request from "../../../services/requests";
import api, {updateHeader} from "../../../services/api";
import './Posts.css';

class Posts extends Component {

    state = {
        posts: [],
        profile: {
            avatar: undefined,
            name: '',
            surname: '',
            user: {
                username: ''
            }
        }
    };

    componentDidMount() {
        if(api.defaults.headers.common["Authorization"]){
            request.getOwnProfile()
                .then(response => {
                    this.props.saveMyProfile(response);
                    if(this.props.profile){
                        request.getFollowingsPosts(this.props.profile)
                            .then(res => {
                                this.props.getPosts(res);
                            })
                            .catch(res => {

                            });
                    }
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
                        if(this.props.profile){
                            request.getFollowingsPosts(this.props.profile)
                                .then(res => {
                                    this.props.getPosts(res);
                                })
                                .catch(res => {

                                });
                        }
                    })
                    .catch();
            } else{
                alert('Something wrong!');
                this.props.history.push('/login');
            }
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.posts !== this.props.posts){
            this.setState({
                posts: this.props.posts || [],
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

    handleGoToProfileClick = () => {
        if(this.props.profile){
            this.props.saveProfile(this.props.profile);
            this.props.history.push('/profile');
        }
    };

    render() {
        const { posts } = this.state;
        return (
            <div className = "PostsComponent ">
                <nav className="posts-nav">
                    <span  className = "nav__link" onClick={this.handleGoToProfileClick}>Profile</span>
                    <div className="nav__link">
                        <input type="text"/>
                    </div>
                    <Link className = "nav__link" to="/" onClick={this.handleLogoutClick}>Logout</Link>
                </nav>
                <div className="posts-main">
                    <div className="posts-main-child posts-left">
                        {
                            this.props.profile && <LeftProfile profile={this.props.profile}/>
                        }
                    </div>
                    <div className="posts-main-child posts-center">
                        <AddPostComponent/>
                        {
                            posts.map((post, index) => {
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
        profile: store.blog.myProfile
    }
}
export default connect(mapStateToProps, { logout, getPosts, saveMyProfile, resetPosts, saveProfile })(Posts);
