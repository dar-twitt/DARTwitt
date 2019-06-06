import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './SignUp.css';
import { register, login } from "../../../actions/blog.actions";
import {connect} from "react-redux";
import request from "../../../services/requests";
import {updateHeader} from "../../../services/api";

class SignUp extends Component {

    state = {
        username: '',
        password: '',
        email: '',
        name: '',
        surname: '',
        status: ''
    };

    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    signUp = () => {
        const { username, password, email, name, surname } = this.state;
        if( username && password && email && name && surname){
            request.registerUser(username, password, email)
                .then(response => {
                    this.props.register(response);
                    request.login(username, password)
                        .then(res => {
                            updateHeader('Authorization', `Token ${res.data.token}`);
                            this.props.login(res);
                            request.createProfile(name, surname)
                                .then(r => {
                                    localStorage.setItem('token', res.data.token);
                                    this.setState({
                                        username: '',
                                        password: '',
                                        email: '',
                                        name: '',
                                        surname: ''
                                    });
                                    this.props.history.push('/posts');
                                })
                                .catch(r => {
                                    alert('SORRY, something wrong!');
                                })
                        })
                        .catch(res => {
                            alert('SORRY, something wrong! ' + res);
                        })
                })
                .catch(response => {
                    alert('SORRY, something wrong!');
                });
        }else{
            alert('SORRY, something is empty!');
        }

    };

    render() {
        return (
            <div className="signUp">
                <nav className="signUp-nav">
                    <Link className = "nav__link" to="/">Home</Link>
                    <Link className = "nav__link" to="/login">Sign In</Link>
                </nav>
                <div className="signUp-main">
                    <div className="signUp-center">
                        <h1>Registration</h1>
                        <input type="text" placeholder="Enter your username"
                               className="signUp__input"
                               value={this.state.username}
                               name="username" onChange={this.handleOnChange}/>
                        <input type="password" placeholder="Enter your password"
                               className="signUp__input"
                               value = {this.state.password}
                               name = "password" onChange={this.handleOnChange}
                        />
                        <input type="text" placeholder="Enter your email"
                               className="signUp__input"
                               value={this.state.email}
                               name="email" onChange={this.handleOnChange}/>
                        <input type="text" placeholder="Enter your name"
                               className="signUp__input"
                               value={this.state.name}
                               name="name" onChange={this.handleOnChange}/>
                        <input type="text" placeholder="Enter your surname"
                               className="signUp__input"
                               value={this.state.surname}
                               name="surname" onChange={this.handleOnChange}/>
                        <button className="signUp__button" onClick={this.signUp}>Sign Up</button>
                    </div>
                </div>
            </div>
        );
    }
}

export function mapStateToProps(store){
    return {
        status: store.blog.status,
        token: store.blog.token,
    }
}
export default connect(mapStateToProps, { register, login })(SignUp);
