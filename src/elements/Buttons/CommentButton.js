import React from 'react'
import { useHistory } from 'react-router-dom'

import '../../components/HomePage/MainView/PostsView/PostsView.css';

// the scroll icon for post cards
export const CommentPostButton = ({ user, post, isCommented }) => {
    const history = useHistory();
    const commentHandler = () => {
        if (!user) { history.push("/login"); return; }
        history.push(`/posts/${post.id}`);
    }
    return (
        <>
            <i onClick={commentHandler} className={`fas fa-scroll metric-icon ${isCommented}`}></i>
            <span className={`post-metric-text comment`}> {post.commentCount} </span>
        </>
    )
}