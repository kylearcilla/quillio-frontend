import React from 'react'

import './TabDetails.css'
import { PostCard, UserCardList } from '../../../elements'

// Used to display certain data depending on which tab is clicked
const TabDetails = ({ tabClicked, user, userPosts, likedPosts }) => {
    return (
        <div className="profile-details-list">
            {(userPosts && tabClicked === "posts") &&
                userPosts.map((post) => <PostCard key={post.id} post={post} />)}
            {(likedPosts && tabClicked === "liked posts") &&
                likedPosts.map((post) => <PostCard key={post.id} post={post} />)}
            {(user && tabClicked === "allegiances") && <UserCardList type="user-result" cards={user.following} />}
            {(user && tabClicked === "bannermen") && <UserCardList type="user-result" cards={user.followers} />}
        </div>
    )
}

export default TabDetails