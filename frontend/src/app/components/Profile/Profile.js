import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './Profile.css';
import LeftProfile from "../LeftProfile/LeftProfile";
import '../LeftProfile/LeftProfile.css';
import api from '../../../services/api';
import request from '../../../services/requests';
import { saveMyProfile, getPosts } from "../../../actions/blog.actions";
import {connect} from "react-redux";
import Post from '../Post/Post';

class Profile extends Component {

    state = {
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

    componentDidMount() {
        if(api.defaults.headers.common['Authorization']){
            request.getOwnProfile()
                .then( response => {
                    this.props.saveMyProfile(response);
                    request.getProfilesPosts(this.props.profile)
                        .then(res => {
                            this.props.getPosts(res);
                        })
                        .catch();
                })
                .catch();

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props !== prevProps){
            this.setState({
                posts: this.props.posts || [],
                profile: this.props.profile || this.state.profile
            });
        }
    }

    render() {
        const { profile } = this.state;
        const { posts } = this.state;
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
<<<<<<< HEAD
                    <div className="profile-main-child profile-left"><LeftProfile profile={profile}/></div>
                    {/*<div className="profile-main-child profile-settings">*/}
                    {/*</div>*/}

=======
                    <div className="profile-main-child profile-left"><LeftProfile profile={this.props.profile}/></div>
                    <div className="profile-main-child profile-settings">
<<<<<<< HEAD
                        {/*<button onClick={}>Edit Profile</button>*/}
=======
>>>>>>> 62b2342540772c88c77ccf9ad010015652a2869f
                    </div>
>>>>>>> d92d6a3a27b1dd0f0f8b67391480616832ebbda0
                    <div className="profile-main-child profile-main">
                        {
                            posts.map((post, index) => {
                                return <Post post={post} key={index}/>
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export function mapStateToProps(store){
    return {
        profile: store.blog.myProfile,

    };
}
export default connect(mapStateToProps, { saveMyProfile, getPosts })(Profile);
