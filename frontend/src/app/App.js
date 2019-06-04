import React, {Component} from 'react';
import './App.css';
// import createBrowserHistory from "history/createBrowserHistory";
import { Route, Link } from "react-router-dom";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SigIn/SignIn";
import Profile from "./components/Profile/Profile";
import Posts from "./components/Posts/Posts";

// const history = createBrowserHistory();


class App extends Component {
  render() {
    return (
        <div>
            <div>
                <nav>
                    <Link className = "nav__link" to="/">Welcome Page</Link>
                    <Link className = "nav__link" to="/register">Register Page</Link>
                    <Link className = "nav__link" to="/login">Login Page</Link>
                    <Link className = "nav__link" to="/profile">Profile Page</Link>
                    <Link className = "nav__link" to="/posts">Posts Page</Link>
                </nav>
            </div>
            <Route exact path="/" component = { WelcomePage }/>
            <Route exact path="/register" component = { SignUp }/>
            <Route exact path="/login" component = { SignIn }/>
            <Route exact path="/profile" component = { Profile }/>
            <Route exact path="/posts" component = { Posts }/>
        </div>
    );
  }
}

export default App;
