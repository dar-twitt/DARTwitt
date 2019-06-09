import React, {Component} from 'react';
import './LeftProfile.css';
import request from "../../../services/requests";
import {connect} from "react-redux";
import { saveMyProfile, saveMyProfileFollowers, saveMyProfileFollowing, getMyPosts, getProfiles } from "../../../actions/blog.actions";
import api, {updateHeader} from "../../../services/api";
import { withRouter } from 'react-router-dom';
class LeftProfile extends Component {
    state = {
        following: [],
        followers: [],
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

    getData = () => {
        const profile = this.props.profile || JSON.parse(localStorage.getItem('profile'));
        if(profile){
            this.setState({
                profile: profile
            });
            localStorage.setItem('profile', JSON.stringify(this.props.profile));
            request.getProfileFollowing(this.props.profile)
                .then(response => {
                    this.props.saveMyProfileFollowing(response);
                })
                .catch();
            request.getProfilesFollowers(this.props.profile)
                .then(response => {
                    this.props.saveMyProfileFollowers(response);
                })
                .catch();
            request.getProfilesPosts(this.props.profile)
                .then(res => {
                    this.props.getMyPosts(res);
                })
                .catch();
        }
    };

    componentDidMount() {
       if(api.defaults.headers.common['Authorization']){
            this.getData();
       }else{
           const token = localStorage.getItem('token');
           if(token){
               updateHeader('Authorization', `Token ${token}`);
               this.getData();
           }
       }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
       if(prevProps !== this.props){
           this.setState({
               profile: this.props.profile || this.state.profile,
               posts: this.props.posts || [],
               following: this.props.following || [],
               followers: this.props.followers || []
           });
       }
    }

    handleFollowingClick = () => {
        if(this.props.following){
            this.props.getProfiles(this.props.following);

            this.props.history.push('/profiles');
        }
    };


    handleFollowersClick = () => {
        if(this.props.followers){
            this.props.getProfiles(this.props.followers);
            this.props.history.push('/profiles');
        }
    };

    render() {
       const { profile } = this.state;
       return (
           <div className="LeftProfileComponent">
                <div className="left-profile-photo">
                    {
                        profile.avatar && <img src={profile.avatar} className="left-profile-avatar" alt=""/>
                    }
                    {
                        !profile.avatar && <div className="left-profile-avatar">No Photo</div>
                    }
                </div>
                <div className="left-profile-info">
                    <span>{`${profile.name} ${profile.surname} @${profile.user.username}`}</span>
                </div>
                <div className="left-profile-data">
                    <div className="left-profile-data-info">
                        <div>Tweets</div>
                        <div>{ this.state.posts.length }</div>
                    </div>
                    <div  className="left-profile-data-info prof" onClick={this.handleFollowingClick}>
                        <div>Following</div>
                        <div>{ this.state.following.length }</div>
                    </div>
                    <div className="left-profile-data-info prof" onClick={this.handleFollowersClick}>
                        <div>Followers</div>
                        <div>{ this.state.followers.length }</div>
                    </div>
                </div>
           </div>
       );
   }
}

export function mapStateToProps(store){
    return{
        followers: store.blog.myFollowers,
        following: store.blog.myFollowing,
        posts: store.blog.myPosts,
    };
}

export default withRouter(connect(
    mapStateToProps,
    { saveMyProfile,
        saveMyProfileFollowers,
        saveMyProfileFollowing,
        getMyPosts,
        getProfiles
    })(LeftProfile));
