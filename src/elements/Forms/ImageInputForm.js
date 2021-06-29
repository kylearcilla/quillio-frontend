import React from 'react'

// Used in conjuction with posting posts, editing profile and banner images, useForm is used
export const ImageInputForm = ({ title, property, values, onChangeHandler }) => {
    return (
        <>
            <label htmlFor={`file-upload-${property}`} className="file-upload-label edit-profile">
                <p>{`Change ${title}`}</p>
                <span className="post-card post-metric-text">
                    {values[property] && (values[property].length > 0 && "Replace Image")}
                </span>
            </label>
            <input
                className={`post-card bottom-form ${property} edit-profile`}
                id={`file-upload-${property}`}
                type="file"
                onChange={onChangeHandler}
                accept="image/*"
            />
            {values[property] && <span className="post-card post-metric-text file-name edit-profile">
                {values[property].name}
            </span>}
        </>
    )
}
