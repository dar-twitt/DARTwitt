import React, {Component} from 'react';
import { profileToEdit, saveMyProfile, saveProfile } from "../../../actions/blog.actions";
import { withRouter } from "react-router";
import {connect} from "react-redux";
import ImageUpload from "../ImageUpload/ImageUpload";
import request from '../../../services/requests';
import api, {updateHeader} from "../../../services/api";

class EditProfile extends Component {
    state = {
        avatar: null,
        name: '',
        surname: '',
        bio: '',
    };

    componentDidMount() {
        if(!this.props.profile){
            const profile = JSON.parse(localStorage.getItem('profileToEdit'));
            if(profile){
                this.props.profileToEdit(profile);
            }
        } else {
            localStorage.setItem('profileToEdit', JSON.stringify(this.props.profile));
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { profile } = this.props;
        if(profile){
            if(this.props !== prevProps){
                this.setState({
                    file: this.props.avatar || this.state.avatar,
                    name: this.props.profile.name || '',
                    surname: this.props.profile.surname || '',
                    bio: this.props.profile.bio || ''
                });
            }
        }

    }

    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleOnSaveClick = () => {
        const profile = new FormData();
        profile.append('name', this.state.name);
        profile.append('surname', this.state.surname);
        profile.append('bio', this.state.bio);
        if(this.props.file){
            const { file } = this.props;
            profile.append('avatar', file, file.name);
        }
        updateHeader('Content-Type', 'multipart/form-data');
        if(api.defaults.headers.common['Authorization']){
            if(this.props.profile){
                request.updateProfile(this.props.profile.id, profile)
                    .then(response => {
                        // request.getOwnProfile()
                        //     .then(res => {
                        //         //this.props.saveMyProfile(res);
                        //         this.props.saveProfile(res);
                        //         if(this.props.prof){
                        //             localStorage.setItem('profile', JSON.stringify(this.props.prof));
                        //         }
                        //     })
                        //     .catch();
                        this.props.history.push('/posts');

                    })
                    .catch();
            }
        } else {
            const token = localStorage.getItem('token');
            if(token){
                updateHeader('Content-Type', 'multipart/form-data');
                updateHeader('Authorization', `Token ${token}`);
                if(this.props.profile){
                    request.updateProfile(this.props.profile.id, profile)
                        .then(response => {
                            // request.getOwnProfile()
                            //     .then(res => {
                            //         //this.props.saveMyProfile(res);
                            //         this.props.saveProfile(res);
                            //         if(this.props.prof){
                            //             localStorage.setItem('profile', JSON.stringify(this.props.prof));
                            //         }
                            //     })
                            //     .catch();
                            this.props.history.push('/posts');

                        })
                        .catch();
                }
            }
        }
    };

    deleteProfile = () => {
        if(this.props.profile){
            const { user } = this.props.profile;
            request.deleteProfile(this.props.profile)
                .then(res => {
                    localStorage.clear();
                    this.props.history.push('/');
                })
                .catch();
        }
    };

    handleOnDeleteClick = () => {
        if(api.defaults.headers.common['Authorization']){
            if(this.props.profile){
                this.deleteProfile()
            }
        } else {
            const token = localStorage.getItem('token');
            if(token){
                updateHeader('Authorization', `Token ${token}`);
                if(this.props.profile){
                    this.deleteProfile();
                }
            }
        }
    };

    render() {
        return (
            <div className="EditComponent">
                {
                    this.props.profile &&
                    <div>
                        <div>
                            <ImageUpload/>
                        </div>
                        <div>
                            Name: <input type="text" name="name" onChange={this.handleOnChange} value={this.state.name}/>
                        </div>
                        <div>
                            Surname: <input type="text" name="surname" onChange={this.handleOnChange} value={this.state.surname}/>
                        </div>
                        <div>
                            Bio: <input type="text" name="bio" onChange={this.handleOnChange}  value={this.state.bio}/>
                        </div>
                        <div>
                            <button onClick={this.handleOnSaveClick}>Save</button>
                            <button onClick={this.handleOnDeleteClick}>Delete</button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
export function mapStateToProps(store){
    return {
        profile : store.blog.profileToEdit,
        avatar: store.blog.file,
        prof: store.blog.myProfile
    }
}

export default withRouter(connect(mapStateToProps, { profileToEdit, saveMyProfile, saveProfile })(EditProfile));
