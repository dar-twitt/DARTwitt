import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './Profile.css';
import LeftProfile from "../LeftProfile/LeftProfile";
import '../LeftProfile/LeftProfile.css';
import api, {updateHeader} from '../../../services/api';
import { withRouter } from 'react-router-dom';
import request from '../../../services/requests';
import {
    getPosts,
    resetPosts,
    getMyPosts,
    saveProfile,
    saveMyProfileFollowing,
    saveMyProfileFollowers,
    getProfilesPosts,
    profileToEdit

} from "../../../actions/blog.actions";
import {connect} from "react-redux";
import Post from '../Post/Post';
import SearchProfilesComponent from "../SearchProfilesComponent/SearchProfilesComponent";

class Profile extends Component {

    state = {
        posts: [],
        me: {
            user: {
                username: '',
                password: ''
            }
        }
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
                    this.props.getProfilesPosts(res);
                })
                .catch();
        }
    };

    componentDidMount() {
        this.props.resetPosts();
        if(api.defaults.headers.common['Authorization']){
            this.getData();
        }else{
            const token = localStorage.getItem('token');
            if(token){
                updateHeader('Authorization',`Token ${token}`);
                this.getData();
            } else{
                alert('Something wrong!');
                this.props.history.push('/login');
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props !== prevProps){
            this.setState({
                posts: this.props.posts || [],
                me: this.props.me || this.state.me
            });
        }
    }

    handleEditClick = () => {
        if(this.props.profile){
            localStorage.setItem('profileToEdit', JSON.stringify(this.props.profile));
            this.props.profileToEdit(this.props.profile);
            this.props.history.push('/edit');
        }
    };

    render() {
        const { posts } = this.state;
        return (
            <div className="ProfileComponent">
                <nav className="profile-nav">
                    <Link  className = "nav__link" to="/posts">Posts</Link>
                    <div className="nav__link">
                        <SearchProfilesComponent/>
                    </div>
                    <Link className = "nav__link" to="/" onClick={this.handleLogoutClick}>Logout</Link>
                </nav>
                <div className="profile-main">
                    <div className="profile-main-child profile-left">
                        {
                            this.props.profile && <LeftProfile profile={this.props.profile}/>
                        }
                        {
                            this.props.profile &&
                            this.props.me &&
                            this.props.me.user.username === this.props.profile.user.username &&
                            <i className="icon-settings profile-settings" onClick={this.handleEditClick}></i>
                        }
                    </div>
                    <div className="profile-main-child profile-posts">
                        {
                            posts.map((post, index) => {
                                return post && <Post post={post} key={index}/>
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
        me: store.blog.myProfile,
        profile: store.blog.profile,
        posts: store.blog.profilesPosts
    };
}
export default withRouter(connect(mapStateToProps,
    {   getPosts,
        resetPosts,
        getMyPosts,
        saveProfile,
        getProfilesPosts,
        saveMyProfileFollowers,
        saveMyProfileFollowing,
        profileToEdit
    })(Profile));
