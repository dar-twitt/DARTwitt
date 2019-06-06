import React, { Component } from 'react';

import './ImageUpload.css';

class ImageUpload extends Component{

    handleImageChange = event => {
        let file = new FormData( event.target.files[0] );
    }

    render(){
        return (
            <div className="image__wrapper" >
                <div className="image" ></div>
                Upload
                <input onChange={this.handleImageChange} className="fileinput" type="file" />
            </div>
        )
    }
}

export default  ImageUpload;
