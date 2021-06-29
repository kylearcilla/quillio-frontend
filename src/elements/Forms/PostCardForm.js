import React from 'react'
import defaultUserPic from '../../images/default.jpg'

// For posting posts, utilizes the useForm hook
export const PostCardForm = ({ user, values, onSubmitHandler, onChangeHandler, resetValues }) => {
    return (
        <div className="post-card-form">
            <div className="post-card-form-container">
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
                                placeholder="Greetings Westoros!"
                                onChange={onChangeHandler}
                                value={values.body}
                            />
                            <button onClick={onSubmitHandler} disabled={values.body === "" ? true : false}>
                                <i className={`fas fa-feather-alt metric-icon ${values.body === "" ? "disabled" : ""}`}></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="post-card-form-bottom">
                    {values.imageURL && <span className="post-card post-metric-text file-name">
                        {values.imageURL.name}
                    </span>}
                    <label htmlFor="file-upload" className="file-upload-label">
                        <i className="fas fa-image post-card metric-icon"></i>
                        <span className="post-card post-metric-text">
                            {values.imageURL === "" ? "Add an Image" : "Replace Image"}
                        </span>
                    </label>
                    {values.imageURL &&
                        <span className="post-card post-metric-text cancel"
                            onClick={resetValues}> Remove Image
                        </span>}
                    <input
                        className="post-card bottom-form imageURL" id="file-upload" type="file"
                        onChange={onChangeHandler}
                        accept="image/*"
                    />
                </div>
            </div>
        </div >
    )
}