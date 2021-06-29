import React, { useContext } from 'react'
import moment from 'moment'
import './ProfileTopView.css'

import { AuthContext } from '../../../authentication/AuthContext'
import { FollowButton } from '../../../elements'
import defaultUserPic from '../../../images/default.jpg'
import defaultBG from '../../../images/defaultBG.jpg'

// Displaying profile details in the profile page
const ProfileTopView = ({ user }) => {
    const { user: currentUser } = useContext(AuthContext);
    return (
        <div className="profile-pg-top-view">
            <img
                className="banner-image"
                src={user.bannerURL ? user.bannerURL : defaultBG}
                alt="user"
            />
            <div className="profile-pg-top-details">
                <div className="top-details-top">
                    <h2>{user.name}</h2>
                    <div className="top-details-user-metrics">
                        <p>{user.followingCount}</p>
                        <span id="allegiances">Allegiances</span>
                        <p>{user.followerCount}</p>
                        <span>Bannermen</span>
                    </div>
                </div>
                <span id="profile-pg-username">{`@${user.username}`}</span>
                <p id="profile-bio">{user.bio ? user.bio : "No bio..."}</p>
                <div className="top-details-bottom">
                    <i className="fas fa-bookmark top-view-detail"></i>
                    <span className="top-view-detail-text">{`${user.houseName ? "House " + user.houseName : "No House"}`}</span>
                    <i className="fas fa-map-pin top-view-detail"></i>
                    <span className="top-view-detail-text">{`${user.location ? user.location : "Nowhere"}`}</span>
                    <i className="far fa-calendar-alt top-view-detail"></i>
                    <span className="top-view-detail-text">{`Joined ${moment(user.createdAt).format("MMM YYYY")}`}</span>
                </div>
            </div>
            <div className="profile-pg-user-img-container">
                <img
                    id="profile-img"
                    src={user.profileImageURL ? user.profileImageURL : defaultUserPic}
                    alt="banner"
                />
                {(currentUser && currentUser.name !== user.name) && <FollowButton user={user} type="profile-page" />}
            </div>
        </div>
    )
}
export default ProfileTopView