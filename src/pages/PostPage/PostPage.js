import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import './PostPage.css'

import PostMainView from '../../components/PostPage'
import getRandomList from '../../utilities/getRandomList'
import defaultUserPic from '../../images/default.jpg'

import { UserCardList } from '../../elements'
import { GET_USERS_QUERY } from '../../utilities/gqlTags'
import { AuthContext } from '../../authentication/AuthContext'

// PostPage has 2 Parts
// 1. Left Side Main View - Post, Comment Form, Comments
// 2. Right User Suggestions - UserSuggestions

const PostPage = ({ match }) => {
    const { data: currentUser } = useContext(AuthContext);
    const { params: { postId } } = match;

    const { data: { getUsers: users } = {} } = useQuery(GET_USERS_QUERY);

    const headerInfo = () => {
        if (!currentUser) return <a href="/login">Login</a>;
        return <> <a href={`/users/${currentUser.id}`}>{currentUser && currentUser.name}</a>
            <img src={currentUser?.profileImageURL || defaultUserPic} alt="user-profile" /> </>
    }

    return (
        <div className="profile-page post-page">
            <div className="profile-page-header">
                <div className="login-side-logo profile">
                    <a href="/"> Quillio </a>
                    <i id="profile-logo" className="fas fa-feather-alt profile"></i>
                </div>
                <div className="profile-header-info"> {headerInfo()} </div>
            </div>
            <div className="profile-page-container">
                <div className="profile-page-left post-page">
                    {<PostMainView postId={postId} />}
                </div>
                <div className="profile-page-right post-page">
                    <div className="suggestions-list profile">
                        <h3 className="suggestions-title-profile">Westerlings</h3>
                        <div className="suggestions-list">
                            <UserCardList type="suggestion" cards={users && getRandomList(users, 6)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PostPage