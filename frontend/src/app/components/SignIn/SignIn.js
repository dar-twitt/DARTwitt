import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './SignIn.css';
import { login } from '../../../actions/blog.actions';
import {connect} from "react-redux";

class SignIn extends Component {

    state = {
        username: '',
        password: ''
    };

    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
        // console.log("username " + this.state.username);
        // console.log("password " + this.state.password);
    };

    loginAction = () => {
        const { username, password } = this.state;
        if( username && password){
            this.props.login(username, password);
            this.setState({
                username: '',
                password: ''
            });
            this.props.history.push('/posts');
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

export function mapStateToProps(store){
    return {
        ...store
    }
}
export default connect(mapStateToProps, { login })(SignIn);
