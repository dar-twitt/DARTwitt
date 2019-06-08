import React, { Component } from 'react';
import './ImageUpload.css';
import {connect} from "react-redux";
import { saveImage } from "../../../actions/blog.actions";

class ImageUpload extends Component{

    handleImageChange = event => {
        let file = new FormData();
        console.log(event.target.files[0]);
        file.append('image', event.target.files[0]);
        console.log(file.get('image'));
        this.props.saveImage(file);
    };

    render(){
        return (
            <div className="image__wrapper" >
                <div className="image" ></div>
                <input onChange={this.handleImageChange} className="fileinput" type="file" />
            </div>
        )
    }
}

export function mapStateToProps(store){
    return {
        profile: store.blog.profile
    }
}

export default connect(mapStateToProps, { saveImage })(ImageUpload);

