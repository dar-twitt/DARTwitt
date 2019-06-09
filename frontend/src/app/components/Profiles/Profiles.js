import React, {Component} from 'react';
import {connect} from "react-redux";
import ProfileBrief from "../ProfileBrief/ProfileBrief";
// import { getProfiles } from "../../../actions/blog.actions";
import './Profiles.css';
class Profiles extends Component {

    state = {
        profiles: []
    };

    componentDidMount() {
        if(this.props.profiles){
            localStorage.setItem('profiles', JSON.stringify(this.props.profiles));
            this.setState({
                profiles: this.props.profiles
            });
        }else{
            const profiles = JSON.parse(localStorage.getItem('profiles'));
            if(profiles){
                this.setState({
                    profiles: profiles
                });
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props !== prevProps){
            this.setState({
                profiles: this.props.profiles || []
            });
        }
    }

    render() {
        const { profiles } = this.state;
        return (
            <div className="ProfilesComponent">
               <div className="profiles__profile">
                   {
                       profiles.map((profile, index) => {
                           return <ProfileBrief profile = {profile} key = {index}/>
                       })
                   }
               </div>
            </div>
        );
    }
}

export function mapStateToProps(store){
    return {
        profiles: store.blog.profiles,
        following: store.blog.myFollowing,
        followers: store.blog.myFollowers
    }
}
export default connect(mapStateToProps, { })(Profiles);
