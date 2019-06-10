import React, {Component} from 'react';
import './App.css';
// import createBrowserHistory from "history/createBrowserHistory";
import { BrowserRouter, Route } from 'react-router-dom';
import WelcomePage from "./components/WelcomePage/WelcomePage";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Profile from "./components/Profile/Profile";
import Posts from "./components/Posts/Posts";
import ImageUpload from "./components/ImageUpload/ImageUpload";
import Profiles from "./components/Profiles/Profiles";
import LeftProfile from "./components/LeftProfile/LeftProfile";
import ProfileBrief from "./components/ProfileBrief/ProfileBrief";
import Post from "./components/Post/Post";
import SearchProfilesComponent from "./components/SearchProfilesComponent/SearchProfilesComponent";
import EditProfile from "./components/EditProfile/EditProfile";
class App extends Component {
  render() {
    return (
        <div className="App">
            {/*<div>*/}
            {/*    <nav>*/}
            {/*        <Link className = "nav__link" to="/">Welcome Page</Link>*/}
            {/*        <Link className = "nav__link" to="/register">Register Page</Link>*/}
            {/*        <Link className = "nav__link" to="/login">Login Page</Link>*/}
            {/*        <Link className = "nav__link" to="/profile">Profile Page</Link>*/}
            {/*        <Link className = "nav__link" to="/posts">Posts Page</Link>*/}
            {/*    </nav>*/}
            {/*</div>*/}
            <BrowserRouter>
                <Route exact path="/asdf" component = { ImageUpload }/>
                <Route exact path="/" component = { WelcomePage }/>
                <Route exact path="/register" component = { SignUp }/>
                <Route exact path="/login" component = { SignIn }/>
                <Route exact path="/profile" component = { Profile }/>
                <Route exact path="/posts" component = { Posts }/>
                <Route exact path="/profiles" component = { Profiles }/>
                <Route exact path="/left" component = { LeftProfile }/>
                <Route exact path="/brief" component = { ProfileBrief }/>
                <Route exact path="/post" component = { Post }/>
                <Route exact path="/search" component = { SearchProfilesComponent }/>
                <Route exact path="/edit" component = { EditProfile }/>
            </BrowserRouter>
        </div>
    );
  }
}
export default App;
