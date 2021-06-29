import React, { useContext } from 'react'

import { AuthContext } from '../../authentication/AuthContext'
import { FollowButton } from '..';

import defaultUserPic from '../../images/default.jpg'
import '../../components/HomePage/SuggestView/SuggestView.css'
import '../../components/HomePage/SideView/SideView.css'

export const UserCard = ({ type, user, isCurrentUser }) => {
    const followButton = (isCurrentUser === false) &&
        <FollowButton user={user} type={type} />

    const userBio = type === "user-result" &&
        <span className={`${type}-card-user-bio`}>{user.bio}</span>

    return (
        <>
            <div className={`${type}-card`}>
                <div className={`${type}-image-container`}>
                    <img
                        className={`${type}-profile-img`}
                        src={user.profileImageURL || defaultUserPic}
                        alt="profile-img" />
                </div>
                <div className={`${type}-card-details`}>
                    <div className={`${type}-card-details-top`}>
                        <h5>{user.name}</h5>
                        <a href={`/users/${user.id}`} className={`${type}-card-details-top-username`}>{`@${user.username}`}</a>
                    </div>
                    <div className={`${type}-card-details-bottom`}>
                        <a href={`/users/${user.id}`}>{`@${user.username}`}</a>
                    </div>
                    <div className={`${type}-card-house-details`}>
                        <i id={`${type}-house-icon`} className="fas fa-bookmark"></i>
                        <span>{user.houseName ? `House ${user.houseName}` : "No House"}</span>
                    </div>
                    {user.bio && userBio}
                </div>
                {followButton}
            </div>
        </>
    )
}

// List for displaying the User Cards
export const UserCardList = ({ type, cards }) => {
    const { data: currentUser } = useContext(AuthContext);
    return (
        <>
            {cards && cards.map((user) => {
                return <UserCard key={user.id} type={type} user={user}
                    isCurrentUser={currentUser ? user.username === currentUser.username : false}
                />
            })}
        </>
    )
}