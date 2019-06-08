import React, {Component} from 'react';
import './LeftProfile.css';
import request from "../../../services/requests";
import {connect} from "react-redux";
import { saveMyProfile, saveMyProfileFollowers, saveMyProfileFollowing } from "../../../actions/blog.actions";
import api, {updateHeader} from "../../../services/api";

class LeftProfile extends Component {
    state = {
        profile: {
            name: '',
            surname: '',
            user: {
                id: 0,
                username: '',
                email: '',
            }
        },
        followers: [],
        following: []
    };

    componentDidMount() {
       if(api.defaults.headers.common['Authorization']){
           request.getOwnProfile()
               .then(response => {
                   this.props.saveMyProfile(response);
                   if(this.props.profile) {
                       request.getProfileFollowing(this.props.profile)
                           .then(response => {
                               this.props.saveMyProfileFollowing(response);
                           })
                           .catch(response => {

                           });
                       request.getProfilesFollowers(this.props.profile)
                           .then(response => {
                               this.props.saveMyProfileFollowers(response);
                           })
                           .catch(response => {

                           })
                   }
               })
               .catch(response => {

               });
       }else{
           const token = localStorage.getItem('token');
           if(token){
               updateHeader('Authorization',`Token ${token}`);
               request.getOwnProfile()
                   .then(res =>{
                       this.props.saveMyProfile(res);
                   })
                   .catch();
           }else {
           }
       }

        }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps !== this.props){
            this.setState({
                profile: this.props.profile || this.state.profile,
                followers: this.props.followers || [],
                followings: this.props.followings || []
            });
        }
    }

    goToProfile = () => {
        this.props.history.push("/profile");
        console.log(this.props);
    };


    render(){
        let  { profile } = this.state;
        return (
            <div>
                <div className="profile-data">
                    <div className="profile_avatar">
                        <div className="profile_addpicture">+</div>
                    </div>
                    <div className="profile-info">
                        <div className="profile_fullname" onClick={this.goToProfile}>
                            {`${profile.name} ${profile.surname}`}
                        </div>
                        <div className="profile_username" onClick={this.goToProfile}>
                        </div>
                    </div>
                    <div className="profile_twittinfos">
                        <div className="profile_twittinfos_twitt">
                            Twitts <br/>
                            0
                        </div>
                        <div className="profile_twittinfos_twitt">
                            Followers <br/>
                            { this.state.followers.length}
                        </div>
                        <div className="profile_twittinfos_twitt">
                            Followings <br/>
                            {this.state.following.length}
                        </div>
                    </div>
                    <div className="profile_login">
                        {`@${profile.user.username}`}
                    </div>
                </div>
            </div>
        );
    }
}

export function mapStateToProps(state){
    return{
        profile: state.blog.myProfile,
        followers: state.blog.myFollowers,
        following: state.blog.myFollowing
    };
}

export default connect(mapStateToProps, { saveMyProfile, saveMyProfileFollowers, saveMyProfileFollowing })(LeftProfile);
