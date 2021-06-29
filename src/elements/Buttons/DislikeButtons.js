import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import { DISLIKE_POST_MUTATION, DISLIKE_COMMENT_MUTATION } from '../../utilities/gqlTags'

export const DislikePostButton = ({ user, post }) => {
    const history = useHistory();
    const [isDisliked, setDisliked] = useState(false);

    useEffect(() => {
        if (user) {
            const flag = post.dislikes.some((d) => (d.username === user.username));
            setDisliked(flag);
        }
    }, [user, post.likes, post.dislikes])

    const [dislikePost] = useMutation(DISLIKE_POST_MUTATION);
    const dislikeHandler = () => {
        if (!user) history.push("/login");
        dislikePost({ variables: { postId: post.id } });
        setDisliked(isDisliked => (!isDisliked));
        return;
    }

    return (
        <>
            <i onClick={dislikeHandler} className={`fas fa-thumbs-down metric-icon ${isDisliked ? "disliked" : ""}`}></i>
            <span className={`post-metric-text unlike ${isDisliked ? "disliked" : ""}`}>{post.dislikeCount}</span>
        </>
    )
}

export const DislikeCommentButton = ({ user, post, comment }) => {
    const history = useHistory();
    const [isDisliked, setDisliked] = useState(false);

    useEffect(() => {
        if (user) {
            const flag = comment.dislikes.some((d) => (d.username === user.username));
            setDisliked(flag);
        }
    }, [user, comment.likes, comment.dislikes])

    const [dislikeComment] = useMutation(DISLIKE_COMMENT_MUTATION);
    const dislikeHandler = () => {
        if (!user) history.push("/login");
        dislikeComment({ variables: { postId: post.id, commentId: comment.id } });
        setDisliked(isDisliked => (!isDisliked));
        return;
    }

    return (
        <>
            <i onClick={dislikeHandler} className={`fas fa-thumbs-down metric-icon ${isDisliked ? "disliked" : ""}`}></i>
            <span className={`post-metric-text unlike ${isDisliked ? "disliked" : ""}`}>{comment.dislikeCount}</span>
        </>
    )
}