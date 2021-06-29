import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import { LIKE_POST_MUTATION, LIKE_COMMENT_MUTATION } from '../../utilities/gqlTags'

export const LikePostButton = ({ user, post }) => {
    const history = useHistory();
    const [isLiked, setLiked] = useState(false);

    useEffect(() => {
        if (user) {
            const flag = post.likes.some((l) => (l.username === user.username));
            setLiked(flag);
        }
    }, [user, post.likes, post.dislikes])

    const [likePost] = useMutation(LIKE_POST_MUTATION)
    const likeHandler = () => {
        if (!user) history.push("/login");
        likePost({ variables: { postId: post.id } });
        setLiked(isLiked => (!isLiked));
        return;
    }

    return (
        <>
            <i onClick={likeHandler} className={`fas fa-thumbs-up metric-icon ${isLiked ? "liked" : ""}`}></i>
            <span className={`post-metric-text like ${isLiked ? "liked" : ""}`}>{post.likeCount}</span>
        </>
    )
}

export const LikeCommentButton = ({ user, post, comment }) => {
    const history = useHistory();
    const [isLiked, setLiked] = useState(false);

    useEffect(() => {
        if (user) {
            const flag = comment.likes.some((d) => (d.username === user.username));
            setLiked(flag);
        }
    }, [user, comment.likes])

    const [likeComment] = useMutation(LIKE_COMMENT_MUTATION);
    const likeHandler = () => {
        if (!user) history.push("/login");
        likeComment({ variables: { postId: post.id, commentId: comment.id } });
        setLiked(isLiked => (!isLiked));
        return;
    }

    return (
        <>
            <i onClick={likeHandler} className={`fas fa-thumbs-up metric-icon ${isLiked ? "liked" : ""}`}></i>
            <span className={`post-metric-text like ${isLiked ? "liked" : ""}`}>{comment.likeCount}</span>
        </>
    )
}