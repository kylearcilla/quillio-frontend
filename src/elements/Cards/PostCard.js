import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import moment from 'moment'

import '../../components/HomePage/MainView/PostsView/PostsView.css';
import defaultUserPic from '../../images/default.jpg'

import { AuthContext } from '../../authentication/AuthContext'
import {
    LikePostButton, DislikePostButton, CommentPostButton,
    DeletePostButton
} from '..'

export const PostCard = ({ post, type = "" }) => {
    const { data: user } = useContext(AuthContext);
    const history = useHistory();

    const postClickedHandler = (e) => {
        if (["post-card-container", "post-card-text", "time",
            "profile-header-bottom-details"].includes(e.target.classList[0])
            && type !== "post-page-card") {
            history.push(`/posts/${post.id}`);
        }
    }

    return (
        <div className={`Post-Card ${type}`}>
            <div className="post-card-container" onClick={postClickedHandler}>
                <div className="post-card-header">
                    <div className="profile-img-container">
                        <img
                            className="profile-img"
                            src={post.userInfo.profileImageURL || defaultUserPic}
                            alt="profile-img"
                        />
                    </div>
                    <div className="profile-header-container">
                        <div className="profile-header-top-details">
                            <span className="name">{post.userInfo.name}</span>
                            <a href={`/users/${post.userInfo.userId}`} className="username">{"@" + post.userInfo.username}</a>
                            <span className="dot">•</span>
                            <span className="time">{moment(post.createdAt).fromNow(true)}</span>
                        </div>
                        <div className="profile-header-bottom-details">
                            <i id="house-icon" className="fas fa-bookmark"></i>
                            <span className="house-name">{post.userInfo.houseName ? "House " + post.userInfo.houseName : "No House"}</span>
                        </div>
                    </div>
                </div>

                <div className="post-card-details">
                    <div className="post-card-text"> {post.body} </div>
                    {post.imageURL &&
                        <img className="post-img" src={post.imageURL} alt="post-img" />
                    }
                    <div className="post-card-metrics">
                        <div className="metrics-left">
                            <LikePostButton user={user} post={post} />
                            <DislikePostButton user={user} post={post} />
                        </div>
                        <div className="metrics-right">
                            {type !== "post-page-card" &&
                                <CommentPostButton user={user} post={post}
                                    isCommented={user ? post.comments.some((c) => (c.userInfo.username === user.username)) : false}
                                />}
                            {(user && post.userInfo.username === user.username)
                                && <DeletePostButton user={user} post={post} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}