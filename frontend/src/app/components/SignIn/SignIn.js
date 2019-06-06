import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './SignIn.css';
import { login } from '../../../actions/blog.actions';
import {connect} from "react-redux";
import request from '../../../services/requests';
import {updateHeader} from "../../../services/api";

class SignIn extends Component {

    state = {
        username: '',
        password: ''
    };

    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    loginAction = () => {
        const { username, password } = this.state;
        if( username && password){
            request.login(username, password)
                .then(response => {
                    updateHeader('Authorization', `Token ${response.data.token}`);
                    this.props.login(response);
                    localStorage.setItem('token', response.data.token);
                    // request.getCurrentUser(response.data.token)
                    //     .then(res => {
                    //         localStorage.setItem('currentUser', JSON.stringify(res.data));
                    //         this.props.getCurrentUser(res);
                    //     })
                    //     .catch();
                    // request.getOwnProfile()
                    //     .then(res => {
                    //         this.props.getProfile(res);
                    //     })
                    //     .catch();
                    this.setState({
                        username: '',
                        password: ''
                    });
                    this.props.history.push('/posts');
                })
                .catch(response => {
                    alert('SORRY, something wrong! ' + response );
                })

        }else{
            alert('SORRY, something is empty!');
        }

    };

    render() {
        return (
            <div className="signIn">
                <nav className="signIn-nav">
                    <Link className = "nav__link" to="/">Home</Link>
                    <Link className = "nav__link" to="/register">Sign Up</Link>
                </nav>
                <div className="signIn-main">
                    <div className="signIn-center">
                        <h1>Login</h1>
                        <input type="text" placeholder="Enter your username"
                               className="signIn__input"
                               value={this.state.username}
                               name="username" onChange={this.handleOnChange}/>
                        <input type="password" placeholder="Enter your password"
                               className="signIn__input"
                               value = {this.state.password}
                               name = "password" onChange={this.handleOnChange}
                        />
                        <button className="signIn__button" onClick={this.loginAction}>Sign In</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, { login })(SignIn);
