import React from 'react'

import { UserCardList } from '../../../elements'
import Options from './Options'
import defaultUserPic from '../../../images/default.jpg'

// displays current user's data
const UserPreview = ({ user, setIsSideViewPressed, isBannermenClicked, setIsBannermenClicked, followers, following }) => {
    const followerList = (!followers || followers.length !== 0) ? <UserCardList type="side-view" cards={followers} /> :
        <div className="stat-list-divider">No bannermen.</div>
    const followingList = (!following || following.length !== 0) ? <UserCardList type="suggestion" cards={following} /> :
        <div className="stat-list-divider">No alliances.</div>

    return (
        <>
            <div className="side-view-details"> <Options user={user} /> </div>
            <button className="side-view-toggle-button-left" onClick={setIsSideViewPressed}>
                <i className="fas fa-angle-double-left"></i>
            </button>
            <div className="Side-view-top">
                <div className="side-view-profile-details">
                    <img
                        className="side-view-profile-img"
                        src={user.profileImageURL || defaultUserPic}
                        alt="side-view-profile-img"></img>
                    <h4>{user.name}</h4>
                    <h5>{"@" + user.username}</h5>
                </div>
                <div className="side-view-profile-subtext">
                    <i id="side-view-house-icon-top" className="fas fa-bookmark"></i>
                    <p className="house-text">{user.houseName ? "House " + user.houseName : "No House"}</p>
                    <i id="pin-icon" className="fas fa-map-pin"></i>
                    <p className="location-text">{user.location || "None"}</p>
                </div>
                <div className="side-view-divider"></div>
                <div className="side-view-profile-stats">
                    <div className="allegiances">
                        <h3>Allegiances</h3>
                        <h5>{user.followingCount}</h5>
                    </div>
                    <div className="bannermen">
                        <h3>Bannermen</h3>
                        <h5>{user.followerCount}</h5>
                    </div>
                </div>
            </div>
            <div className="Side-view-bottom">
                <div className="side-view-tabs">
                    <button
                        className={isBannermenClicked ? "bannermen-tab clicked" : "bannermen-tab"}
                        onClick={() => (setIsBannermenClicked(true))}
                    >
                        Bannermen
                    </button>
                    <button
                        className={isBannermenClicked ? "allegiances-tab" : "allegiances-tab clicked"}
                        onClick={() => (setIsBannermenClicked(false))}
                    >
                        Allegiances
                    </button>
                    <div className="side-view-stat-list">
                        {isBannermenClicked ? followerList : followingList}
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserPreview