import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import TabDetails from '../TabDetails/TabDetails'
import ProfileTabs from '../ProfileTabs/ProfileTabs'
import ProfileTopView from '../ProfileTopView/ProfileTopView'

import { GET_USER_LIKED_POSTS_QUERY, GET_USER_POSTS_QUERY } from '../../../utilities/gqlTags'

// Used to hold the main details for Profile Page
// Separated this way to prevent rerenders for User Suggestions with mixing of states
const ProfileMainDetails = ({ user, userId }) => {
    const [tabClicked, setTabClicked] = useState("posts");
    const tabHandler = (e) => setTabClicked(e.currentTarget.textContent.toLowerCase());

    const { data: { getUserPosts: userPosts } = {} } = useQuery(GET_USER_POSTS_QUERY, {
        variables: { userId: userId }
    });
    const { data: { getUserLikedPosts: likedPosts } = {} } = useQuery(GET_USER_LIKED_POSTS_QUERY, {
        variables: { userId: userId }
    });

    return (
        <>
            <ProfileTopView user={user} />
            <ProfileTabs tabClicked={tabClicked} tabHandler={tabHandler} />
            <TabDetails
                tabClicked={tabClicked}
                user={user}
                userPosts={userPosts}
                likedPosts={likedPosts}
            />
        </>
    )
}

export default ProfileMainDetails
