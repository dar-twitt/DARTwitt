import React, {Component} from 'react';
import * as moment from 'moment';
import './ProfileBrief.css';
import { withRouter } from 'react-router-dom';
import { saveProfile, saveMyProfileFollowing, saveMyProfileFollowers } from "../../../actions/blog.actions";
import {connect} from "react-redux";
import request from "../../../services/requests";
import api, {updateHeader} from "../../../services/api";

class ProfileBrief extends Component {
    state = {
        me: {
            user: {
                username: '',
                password: ''
            }
        },
        followers: [],
        following: [],
        isFollowed: false
    };

    getData = () => {
        if(this.props.me){
            request.getProfileFollowing(this.props.me)
                .then(response => {
                    this.props.saveMyProfileFollowing(response);
                })
                .catch();
            request.getProfilesFollowers(this.props.me)
                .then(response => {
                    this.props.saveMyProfileFollowers(response);
                })
                .catch();
        }
    };

    componentDidMount() {
        this.checkForFollow();
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
                me: this.props.me || this.state.me,
                following: this.props.following || [],
                followers: this.props.followers || []
            });
            this.checkForFollow();
        }
    }

    checkForFollow = () => {
        if(this.props.following){
            if(this.props.me){
                const { following } = this.props;
                for(let i = 0; i< following.length; i++ ){
                    if(following[i].user.username === this.props.profile.user.username){
                        this.setState({
                            isFollowed: true
                        });
                        break;
                    }
                }
            }
        }
    };
    //
    // checkForFollowers = () => {
    //     if(this.props.following){
    //         if(this.props.me){
    //             const { following } = this.props;
    //             for(let i = 0; i< following.length; i++ ){
    //                 if(following[i].user.username === this.props.profile.user.username){
    //                     this.setState({
    //                         isFollowed: true
    //                     });
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    // };

    handleShowProfile = () => {
        if(this.props.profile){
            this.props.saveProfile(this.props.profile);
            localStorage.setItem('profile', JSON.stringify(this.props.profile));
            this.props.history.push('/profile');
        }
    };

    handleFollowingProcessClick = () => {
        if(this.props.me){
            if(!this.state.isFollowed){
                request.followProfile(this.props.me, this.props.profile)
                    .then(response => {
                        request.getProfileFollowing(this.props.me)
                            .then(res => {
                                this.props.saveMyProfileFollowing(res);
                                this.setState({
                                    isFollowed: true
                                });
                            })
                    })
                    .catch();
            }else{
                request.unfollowProfile(this.props.me, this.props.profile)
                    .then(response => {
                        request.getProfileFollowing(this.props.me)
                            .then(res => {
                                this.props.saveMyProfileFollowing(res);
                                this.setState({
                                    isFollowed: false
                                });
                            })
                    })
                    .catch();
            }
        }
    };

    render() {
        const { profile } = this.props;
        return (
            <div className="ProfileBriefComponent">
                <div className="pb-avatar">
                    {
                        profile.avatar && <img src="" alt="" className="pb-photo photo-pb"/>
                    }
                    {
                        !profile.avatar && <div className="pb-photo">No Photo</div>
                    }
                </div>
                <div className="pb-data">
                    <span className="pb-name">{`${profile.name} ${profile.surname}`}</span>
                    <span className="pb-username" onClick={this.handleShowProfile}>{`@${profile.user.username}`}</span>
                    <span className="pb-date">Joined {moment(profile.created_at).format('DD-MM-YYYY')}</span>
                </div>
                {
                    this.props.me &&
                    this.props.me.user.username !== this.props.profile.user.username &&
                    !this.state.isFollowed &&
                    <div className="follow-unfollow" onClick={this.handleFollowingProcessClick}>Follow</div>
                }
                {
                    this.props.me &&
                    this.props.me.user.username !== this.props.profile.user.username &&
                    this.state.isFollowed &&
                    <div className="follow-unfollow" onClick={this.handleFollowingProcessClick}>UnFollow</div>
                }
            </div>
        );
    }
}
export function mapStateToProps(store){
    return {
        me: store.blog.myProfile,
        followers: store.blog.myFollowers,
        following: store.blog.myFollowing
    }
}
export default withRouter(connect(mapStateToProps, { saveProfile, saveMyProfileFollowing, saveMyProfileFollowers })(ProfileBrief));
