import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './Profile.css';
import LeftProfile from "../LeftProfile/LeftProfile";
import '../LeftProfile/LeftProfile.css';
import api from '../../../services/api';
import request from '../../../services/requests';
import { getPosts, resetPosts, getMyPosts, saveProfile, saveMyProfileFollowing, saveMyProfileFollowers } from "../../../actions/blog.actions";
import {connect} from "react-redux";
import Post from '../Post/Post';

class Profile extends Component {

    state = {
        posts: []
    };

    getData = () => {
        const profile = this.props.profile || JSON.parse(localStorage.getItem('profile'));
        if(profile){
            this.props.saveProfile(profile);
            this.setState({
                profile: profile
            });
            localStorage.setItem('profile', JSON.stringify(profile));
            request.getProfileFollowing(profile)
                .then(response => {
                    this.props.saveMyProfileFollowing(response);
                })
                .catch();
            request.getProfilesFollowers(profile)
                .then(response => {
                    this.props.saveMyProfileFollowers(response);
                })
                .catch();
            request.getProfilesPosts(profile)
                .then(res => {
                    this.props.getMyPosts(res);
                })
                .catch();
        }
    };

    componentDidMount() {
        this.props.resetPosts();
        if(api.defaults.headers.common['Authorization']){
            this.getData();
        }else{

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props !== prevProps){
            this.setState({
                posts: this.props.posts || []
            });
        }
    }

    render() {
        const { posts } = this.state;
        return (
            <div className="ProfileComponent">
                <nav className="profile-nav">
                    <Link  className = "nav__link" to="/posts">Posts</Link>
                    <div className="nav__link">
                        <input type="text"/>
                    </div>
                    <Link className = "nav__link" to="/" onClick={this.handleLogoutClick}>Logout</Link>
                </nav>
                <div className="profile-main">
                    <div className="profile-main-child profile-left">
                        {
                            this.props.profile && <LeftProfile profile={this.props.profile}/>
                        }
                    </div>
                    <div className="profile-main-child profile-posts">
                        {
                            posts.map((post, index) => {
                                return <Post post={post} key={index}/>
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export function mapStateToProps(store){
    return {
        profile: store.blog.profile,
        posts: store.blog.myPosts
    };
}
export default connect(mapStateToProps, { getPosts, resetPosts, getMyPosts, saveProfile, saveMyProfileFollowers, saveMyProfileFollowing })(Profile);
