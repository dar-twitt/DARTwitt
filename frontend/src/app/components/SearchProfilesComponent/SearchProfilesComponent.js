import React, {Component} from 'react';
import request from '../../../services/requests';
import api, {updateHeader} from '../../../services/api';
import { getProfiles } from "../../../actions/blog.actions";
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import './SearchProfilesComponents.css';

class SearchProfilesComponent extends Component {
    state = {
        username: ''
    };

    handleOnChange = e => {
        this.setState({
            username: e.target.value
        })
    };

    getData = () => {
        request.getProfiles(this.state.username)
            .then(res => {
                this.props.getProfiles(res.data);
                this.setState({
                    username: ''
                });
                this.props.history.push('/profiles');
            })
            .catch();
    };

    handleOnFindClick = () => {
        if(api.defaults.headers.common['Authorization']){
            this.getData();
        } else {
            const token = localStorage.getItem('token');
            if(token){
                updateHeader('Authorization', `Token ${token}`);
                this.getData();
            }else{

            }
        }
    };

    render() {
        return (
            <div className="SearchProfilesComponent">
                <input type="text" value={this.state.username} onChange={this.handleOnChange}/>
                <button onClick={this.handleOnFindClick}>Find</button>
            </div>
        );
    }
}

export default withRouter(connect(null, {getProfiles})(SearchProfilesComponent));
