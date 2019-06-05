import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './SignUp.css';
import { register, login, createProfile } from "../../../actions/blog.actions";
import {connect} from "react-redux";

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
        // console.log("username " + this.state.username);
        // console.log("password " + this.state.password);
    };

    // componentDidUpdate(prevProps){
    //     // to avoid infinite loop, set state in condition
    //     if( this.props.status !== prevProps.status ){
    //         this.setState({
    //             status: this.props.status
    //         });
    //     }
    // }
    //have to be fixed
    signUp = () => {
        const { username, password, email, name, surname } = this.state;
        if( username && password && email && name && surname){
            this.props.register(username, password, email);
            console.log(this.props);
            if(this.props.status === 'registered'){
                this.props.login(username, password);
                this.props.createProfile(this.props.token, name, surname);
            }
            this.setState({
                username: '',
                password: '',
                email: '',
                name: '',
                surname: ''
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
export default connect(mapStateToProps, { register, login, createProfile })(SignUp);
