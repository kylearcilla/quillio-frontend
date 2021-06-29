import React, { useState, useEffect, useContext } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import './ProfilePage.css'

import defaultUserPic from '../../images/default.jpg'
import { GET_USER_MUTATION, GET_USERS_QUERY } from '../../utilities/gqlTags'

import { AuthContext } from '../../authentication/AuthContext'
import ProfileMainDetails from '../../components/ProfilePage/ProfileMainDetails'
import ProfileSideDetails from '../../components/ProfilePage/ProfileSideDetails'
import EditProfile from '../../components/ProfilePage/EditProfile'

// PostPage has 2 Parts
// 1. Left Side Main View - Profile Details, Posts, LikedPost, Following/Unfollowing
// 2. Right User Suggestions - UserSuggestions
// These are separated to prevent rerenders with mixed states

const ProfilePage = ({ match }) => {
    const { params: { userId } } = match;
    const { data: currentUser } = useContext(AuthContext);
    const [editProfile, setEditProfile] = useState(false);
    useEffect(() => { getThisUser({ variables: { userId: userId } }); })

    const [getThisUser, { data: { getUser: user } = {} }] = useMutation(GET_USER_MUTATION);
    const { data: { getUsers: users } = {} } = useQuery(GET_USERS_QUERY);

    const headerInfo = () => {
        if (!currentUser) return <a href="/login">Login</a>;
        return <> <a href={`/users/${userId}`}>{currentUser && currentUser.name}</a>
            <img src={currentUser?.profileImageURL || defaultUserPic} alt="user-profile" /> </>
    }

    return (
        <>
            <div className="profile-page">
                <div className="profile-page-header">
                    <div className="login-side-logo profile">
                        <a href="/"> Quillio </a>
                        <i id="profile-logo" className="fas fa-feather-alt profile"></i>
                    </div>
                    <div className="profile-header-info"> {headerInfo()} </div>
                </div>
                <div className="profile-page-container">
                    <div className="profile-page-left">
                        {user && <ProfileMainDetails user={user} userId={userId} />}
                    </div>
                    {user && <ProfileSideDetails user={user} users={users}
                        onClickEdit={() => (setEditProfile(!editProfile))}
                    />}
                </div>
            </div>
            <EditProfile editProfile={editProfile} onClickEdit={() => (setEditProfile(!editProfile))} />
        </>
    )
}
export default ProfilePage