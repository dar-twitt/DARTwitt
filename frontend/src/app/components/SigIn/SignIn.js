import React, {Component} from 'react';
import { Route, Link } from "react-router-dom";

class SignIn extends Component {
    render() {
        return (
            <div className="signIn">
                <nav>
                    <Link className = "nav__link" to="/">Home</Link>
                    <Link className = "nav__link" to="/register">Sign Up</Link>
                </nav>
                <div className="sigIn-main">
                    <div className="signIn-center">
                        <h1>Login to DARTwitt</h1>
                        <input type="text" placeholder="Enter your username" className="sigIn__input"/>
                        <input type="password" placeholder="Enter your password" className="sigIn__input"/>
                        <button className="sigIn__button">Sign In</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;
