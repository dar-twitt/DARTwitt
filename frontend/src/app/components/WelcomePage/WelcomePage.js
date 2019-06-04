import React, {Component} from 'react';
import './WelcomePage.css';
import { Route, Redirect } from 'react-router';

class WelcomePage extends Component {

    componentDidMount() {
        if(localStorage.getItem('token')){

        }
    }

    loginRedirect = () => {
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

export default WelcomePage;
