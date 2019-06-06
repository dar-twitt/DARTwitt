import React, {Component} from 'react';
import './WelcomePage.css';
import {connect} from "react-redux";
import request from "../../../services/requests";
import { getCurrentUser, updateToken } from "../../../actions/blog.actions";
import {updateHeader} from "../../../services/api";

class WelcomePage extends Component {

    componentDidMount() {
        const token = localStorage.getItem('token');
        if(token){
            request.getCurrentUser(token)
                .then(response => {
                    updateHeader('Authorization', `Token ${token}`);
                    this.props.updateToken(token);
                    this.props.history.push('/posts');
                })
                .catch();
        }
    }

    loginRedirect = () => {
        console.log(this.props);
        this.props.history.push('/login');
    };

    registerRedirect = () => {
        this.props.history.push('/register');
    };

    render() {
        return (
            <div className="welcome">
                <div className="welcome_left">DAR</div>
                <div className="welcome_right" >
                    <div className="welcome_right-center">
                        <h1>See what’s happening in the world right now</h1>
                        <div className = "welcome__bttn-group">
                            <button className="welcome_right__bttn sign-in" onClick={this.loginRedirect}>Sign In</button>
                            <button className="welcome_right__bttn sign-up" onClick={this.registerRedirect}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export function mapStateToProps(state){
    return {
        token: state.token
    }
}
export default connect(mapStateToProps, { getCurrentUser, updateToken })(WelcomePage);
