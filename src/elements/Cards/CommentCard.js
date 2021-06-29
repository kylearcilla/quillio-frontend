import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/client'
import moment from 'moment'

import { DELETE_COMMENT_MUTATION } from '../../utilities/gqlTags'
import defaultUserPic from '../../images/default.jpg'
import { DislikeCommentButton, LikeCommentButton } from '..'
import { AuthContext } from '../../authentication/AuthContext'

export const CommentCard = ({ post, comment, commentClicked, optionsClickedHandler, deleteClicked }) => {
    const { data: user } = useContext(AuthContext);

    return (
        <div>
            <div className="Post-Card comment-card">
                <div className="post-card-container" >
                    <div className="post-card-header">
                        <div className="profile-img-container">
                            <img className="profile-img post-page" alt="profile-img"
                                src={comment.userInfo.profileImageURL || defaultUserPic}
                            />
                        </div>
                        <div className="profile-header-container">
                            <div className="profile-header-top-details">
                                <span className="name">{comment.userInfo.name}</span>
                                <a href={`/users/${comment.userInfo.userId}`} className="username">{`@${comment.userInfo.username}`}</a>
                                <span className="dot">•</span>
                                <span className="time">{moment(comment.createdAt).fromNow(true)}</span>
                                {user && ([comment.userInfo.username, post.userInfo.username].includes(user.username)) &&
                                    <>
                                        <span onClick={() => (optionsClickedHandler(comment.id))} className="dots-menu">...</span>
                                        {commentClicked === comment.id &&
                                            <div className="modal options-box">
                                                <div>
                                                    <button onClick={deleteClicked}>{comment.userInfo.username === user.username ? "Delete your comment" : "Delete this user's comment"}</button>
                                                </div>
                                            </div>
                                        }
                                    </>
                                }
                            </div>
                            <div className="profile-header-bottom-details">
                                <i id="house-icon" className="fas fa-bookmark"></i>
                                <span className="house-name">{comment.userInfo.houseName ? `House ${comment.userInfo.houseName}` : "No House"}</span>
                            </div>
                        </div>
                    </div>
                    <div className="post-card-details post-page">
                        <div className="post-card-text post-page"> {comment.body} </div>
                        <div className="post-card-metrics">
                            <div className="metrics-left">
                                <LikeCommentButton user={user} post={post} comment={comment} />
                                <DislikeCommentButton user={user} post={post} comment={comment} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

// Used for listing the Comments
export const CommentCardList = ({ comments, post }) => {
    const [commentClicked, setCommentClicked] = useState("");
    const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION)

    return (
        <>
            {comments && comments.map((comment) => {
                return <CommentCard
                    key={comment.id}
                    post={post}
                    comment={comment}
                    commentClicked={commentClicked}
                    optionsClickedHandler={(commentId) => {
                        if (commentId === commentClicked) { setCommentClicked(""); return; }
                        setCommentClicked(commentId)
                    }}
                    deleteClicked={() => {
                        setCommentClicked("");
                        deleteComment({ variables: { postId: post.id, commentId: commentClicked } })
                    }}
                />
            })}
        </>
    )
}