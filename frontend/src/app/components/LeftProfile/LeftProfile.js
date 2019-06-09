import React, {Component} from 'react';
import './LeftProfile.css';
import request from "../../../services/requests";
import {connect} from "react-redux";
import { saveMyProfile, saveMyProfileFollowers, saveMyProfileFollowing, getMyPosts } from "../../../actions/blog.actions";
import api, {updateHeader} from "../../../services/api";

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
                    <div  className="left-profile-data-info">
                        <div>Following</div>
                        <div>{ this.state.following.length }</div>
                    </div>
                    <div className="left-profile-data-info">
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

export default connect(mapStateToProps, { saveMyProfile, saveMyProfileFollowers, saveMyProfileFollowing, getMyPosts })(LeftProfile);
