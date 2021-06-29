import React, { useContext } from 'react'
import './PostMainView.css'
import { useQuery, useMutation } from '@apollo/client'

import useForm from '../../utilities/useForm'

import { GET_POST_QUERY, CREATE_COMMENT_MUTATION } from '../../utilities/gqlTags'
import { PostCard, CommentCardForm, CommentCardList } from '../../elements'
import { AuthContext } from '../../authentication/AuthContext'

// Displays a Post page - shows comments and upload comment form
const PostMainView = ({ postId }) => {
    const { data: currentUser } = useContext(AuthContext);
    const { values, onSubmitHandler, onChangeHandler } = useForm(callback, {
        body: ""
    })

    function callback() { createComment({ variables: { postId: post.id, body: values.body } }); }
    const { data: { getPost: post } = {} } = useQuery(GET_POST_QUERY, { variables: { postId } });
    const [createComment] = useMutation(CREATE_COMMENT_MUTATION, { update() { values.body = "" } });

    return (
        <>
            {post && <PostCard post={post} type="post-page-card" />}
            {currentUser && <CommentCardForm
                user={currentUser}
                values={values}
                onSubmitHandler={onSubmitHandler}
                onChangeHandler={onChangeHandler}
            />}
            {post && <div className="comment-count">{`${post.commentCount} Comments`}</div>}
            {post && <CommentCardList comments={post.comments} post={post} />}
        </>
    )
}

export default PostMainView
