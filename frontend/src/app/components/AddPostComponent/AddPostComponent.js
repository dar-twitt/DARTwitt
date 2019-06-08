import React, {Component} from 'react';
import {connect} from "react-redux";
import ImageUpload from '../ImageUpload/ImageUpload';
import './AddPostComponent.css';
import request from '../../../services/requests';
import { getPosts } from "../../../actions/blog.actions";
import * as moment from 'moment';
class AddPostComponent extends Component {
    state = {
        text: ''
    };

    formatDate(date) {
        return moment(date).format('YYYY-MM-DDThh:mm');
    }

    handleOnTweetClick = () => {
        const post = {
            text: this.state.text,
            image: this.props.file.get('image'),
            created_at: this.formatDate(Date.now())
        };
        request.createProfilesPost(this.props.profile, post)
            .then(response => {
                request.getPosts()
                    .then(res => {
                        this.props.getPosts(res);
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

export default connect(mapStateProps, { getPosts })(AddPostComponent);
