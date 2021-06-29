import React from 'react'
import defaultUserPic from '../../images/default.jpg'

// For posting comments, useForm is used
export const CommentCardForm = ({ user, values, onSubmitHandler, onChangeHandler }) => {
    return (
        <div className="post-card-form comment-form">
            <div className="post-card-form-container comment-form">
                <div className="post-card-form-top">
                    <div className="post-card-img-container">
                        <img src={user.profileImageURL || defaultUserPic} className="profile-img" alt="profile-img"></img>
                    </div>
                    <div className="post-card-details-container">
                        <div className="post-card-form profile-header-top-details">
                            <span className="name">{user.name}</span>
                            <a href={`/users/${user.id}`} className="username">{"@" + user.username}</a>
                        </div>
                        <div className="post-card-details-body">
                            <input
                                className="post-card sign-form-input body"
                                placeholder="Aye m'lord! A glorious post!"
                                onChange={onChangeHandler}
                                value={values.body}
                            />
                            <button onClick={onSubmitHandler} disabled={values.body === "" ? true : false}>
                                <i className={`fas fa-feather-alt metric-icon ${values.body === "" ? "disabled" : ""}`}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

