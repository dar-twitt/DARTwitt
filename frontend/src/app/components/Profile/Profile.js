import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './Profile.css';
import LeftProfile from "../LeftProfile/LeftProfile";

class Profile extends Component {

    state = {
        posts: [],
    };

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
                    <div className="profile-main-child profile-left"><LeftProfile/></div>
                    <div className="profile-main-child profile-main">

                    </div>

                </div>
            </div>
        );
    }
}

export default Profile;
