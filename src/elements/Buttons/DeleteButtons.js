import React from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import { DELETE_POST_MUTATION } from '../../utilities/gqlTags'

export const DeletePostButton = ({ user, post }) => {
    const history = useHistory();
    const [deletePost] = useMutation(DELETE_POST_MUTATION, { update() { window.location.reload(); } });
    const deletePostHandler = () => {
        if (user) {
            deletePost({ variables: { postId: post.id } });
            return;
        }
        history.push("/login");
    }
    return (
        <> <i onClick={deletePostHandler} className="far fa-trash-alt metric-icon"></i> </>
    )
}
