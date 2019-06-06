import React, {Component} from 'react';
import './LeftProfile.css';
import { withRouter } from "react-router";


class LeftProfile extends Component {

    goToProfile = () => {
        this.props.history.push("/profile");
        console.log(this.props);
    };


    render() {
        const { post } = this.props;
        return (
            <div>
                <div className="profile-top">
                    <div className="profile_avatar">
                        <div className="profile_addpicture">+</div>
                    </div>
                </div>
                <div className="profile-bottom">
                    <div className="profile-info">
                        <div className="profile_fullname" onClick={this.goToProfile}>
                            Bagdat Zhumagazieva
                        </div>
                        <div className="profile_username" onClick={this.goToProfile}>
                            @BagdatZhumagaz1
                        </div>
                    </div>
                    <div className="profile_twittinfos">
                        <div className="profile_twittinfos_twitt">
                            Twitts <br/>
                            0
                        </div>
                        <div className="profile_twittinfos_twitt">
                            Followers <br/>
                            0
                        </div>
                        <div className="profile_twittinfos_twitt">
                            Followings <br/>
                            0
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// export default LeftProfile;
export default withRouter(LeftProfile);
// const LeftProfileWithRouter = withRouter(LeftProfile);
