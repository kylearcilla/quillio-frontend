import React, { useContext } from 'react'

import { UserCardList } from '../../../elements'
import getRandomList from '../../../utilities/getRandomList'
import { AuthContext } from '../../../authentication/AuthContext'

import defaultUserPic from '../../../images/default.jpg'
import spinner from '../../../images/spinner.gif'
import './SuggestView.css'

const SuggestView = ({ loading: homeLoading, users }) => {
    const { data: userData } = useContext(AuthContext);
    const getWesterlings = () => {
        if (!users) return;
        const randomUsers = getRandomList(users, 7);
        return <UserCardList type="suggestion" cards={randomUsers} />;
    }

    const getUserSuggestions = () => {
        if (!users || !userData) return;
        const updatedUsers = users.filter((u) => {
            const isFollowing = userData.following.some((f) => f.username === u.username);
            return !isFollowing && u.username !== userData.username;
        });
        if (updatedUsers.length === 0) {
            return <div className="stat-list-divider">Wow! You are allies with everyone.</div>
        }
        const randomUsers = getRandomList(updatedUsers, 7);
        return <UserCardList type="suggestion" cards={randomUsers} />;
    }

    const topRightHeader = userData ? <> <a href={`/users/${userData.id}`}>{userData.name}</a>
        <img className="profile-img suggestion-header"
            src={userData.profileImageURL || defaultUserPic} alt="user-profile" /> </> :
        <a href="/register" className="suggest-header-register">Register</a>

    return (
        <div className="suggest-view-container">
            <div className="suggest-view-header"> {topRightHeader} </div>
            <div className="suggestions-container">
                <span className="suggestions-title">{userData ? "Possible Allegiances" : "Westerlings"}</span>
                <div className="suggestions-list">
                    {homeLoading ? <img src={spinner} className="spinner" /> :
                        userData ? getUserSuggestions() : getWesterlings()}
                </div>
            </div>
        </div>
    )
}

export default SuggestView;