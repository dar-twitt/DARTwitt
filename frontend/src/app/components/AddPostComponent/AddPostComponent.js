import React, {Component} from 'react';
import {connect} from "react-redux";
import ImageUpload from '../ImageUpload/ImageUpload';
import './AddPostComponent.css';
import request from '../../../services/requests';
import { getPosts, resetImage, getMyPosts } from "../../../actions/blog.actions";
import * as moment from 'moment';
import { updateHeader } from "../../../services/api";

class AddPostComponent extends Component {
    state = {
        text: ''
    };

    formatDate(date) {
        return moment(date).format('YYYY-MM-DDThh:mm');
    }

    handleOnTweetClick = () => {
        const post = new FormData();
        if(this.props.file){
            post.append('image', this.props.file, this.props.file.name)
        }
        post.append('text', this.state.text);
        post.append('created_at', this.formatDate(Date.now()));
        updateHeader('Content-Type', 'multipart/form-data');
        request.createProfilesPost(this.props.profile, post)
            .then(response => {
                this.setState({
                    text: ''
                });
                this.props.resetImage();
                if(this.props.profile){
                    request.getFollowingsPosts(this.props.profile)
                        .then(res => {
                            this.props.getPosts(res);
                        })
                        .catch(res => {

                        });
                }
                request.getProfilesPosts(this.props.profile)
                    .then(res => {
                        this.props.getMyPosts(res);
                    })
                    .catch();
            })
            .catch();
    };

    handleOnChange = e => {
        this.setState({
            text: e.target.value
        })
    };

    render() {
        return (
            <div className = "AddPostComponent">
                <input type="text" placeholder="what's happening?" className="add-input" value={this.state.text} onChange={this.handleOnChange}/>
                <div className = "add-image">
                    <ImageUpload/>
                </div>
                <button className="add-post__bttn" onClick={this.handleOnTweetClick}>Tweet</button>
            </div>
        );
    }
}

export function mapStateProps(store){
    return {
        profile: store.blog.myProfile,
        file: store.blog.file
    }
}

export default connect(mapStateProps, { getPosts, resetImage, getMyPosts })(AddPostComponent);
