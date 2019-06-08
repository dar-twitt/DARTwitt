import React, {Component} from 'react';
import './LeftProfile.css';
import request from "../../../services/requests";
import {connect} from "react-redux";
import { saveMyProfile, saveMyProfileFollowers, saveMyProfileFollowing, getPosts } from "../../../actions/blog.actions";
import api, {updateHeader} from "../../../services/api";

class LeftProfile extends Component {
    state = {
        following: [],
        followers: [],
        posts: [],
        profile:{
            avatar: undefined,
            name: '',
            surname: '',
            user: {
                username: ''
            }
        }
    };

    getData = () => {
        request.getOwnProfile()
            .then(res => {
                this.props.saveMyProfile(res);
                if(this.props.profile){
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
                        .then(response => {
                            this.props.getPosts(response);
                        })
                        .catch();
                }
            });
    };

   componentDidMount() {

       if(api.defaults.headers.common['Authorization']){
            this.getData();
       }else{
           const token = localStorage.getItem('token');
           if(token){
               updateHeader('Authorization', `Token ${token}`);
               this.getData();
           }else{

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
                <table className="left-profile-data">
                    <tr>
                        <td>Tweets</td>
                        <td>Following</td>
                        <td>Followers</td>
                    </tr>
                    <tr>
                        <td>{ this.state.posts.length }</td>
                        <td>{ this.state.following.length }</td>
                        <td>{ this.state.followers.length }</td>
                    </tr>
                </table>
           </div>
       );
   }
}

export function mapStateToProps(store){
    return{
        followers: store.blog.myFollowers,
        following: store.blog.myFollowing,
        posts: store.blog.posts,
        profile: store.blog.myProfile
    };
}

export default connect(mapStateToProps, { saveMyProfile, saveMyProfileFollowers, saveMyProfileFollowing, getPosts })(LeftProfile);
