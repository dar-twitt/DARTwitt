import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './Profile.css';
import LeftProfile from "../LeftProfile/LeftProfile";
import '../LeftProfile/LeftProfile.css';
import api from '../../../services/api';
import request from '../../../services/requests';
import { saveMyProfile } from "../../../actions/blog.actions";
import {connect} from "react-redux";

class Profile extends Component {

    state = {
        posts: [],
    };

    componentDidMount() {
        if(api.defaults.headers.common['Authorization']){
            request.getOwnProfile()
                .then( response => {
                    this.props.saveMyProfile(response);
                })
                .catch();
        }
    }

    render() {
        const {profile} = this.props;
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
                    <div className="profile-main-child profile-left"><LeftProfile profile={this.props.profile}/></div>
                    <div className="profile-main-child profile-settings">
                        {/*<button onClick={}>Edit Profile</button>*/}
                    </div>
                    <div className="profile-main-child profile-main">
                    </div>
                </div>
            </div>
        );
    }
}
export function mapStateToProps(store){
    return {
        profile: store.blog.myProfile
    };
}
export default connect(mapStateToProps, { saveMyProfile })(Profile);
