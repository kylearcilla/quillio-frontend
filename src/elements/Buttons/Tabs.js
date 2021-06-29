import React from 'react'

import '../../components/ProfilePage/ProfileTabs/ProfileTabs.css';

// Custom Tab for HomePage
export const HomeHeaderTab = ({ iconCurrenlyClicked, thisIcon, iconClickHandler }) => {
    const faIconClass = thisIcon === "home" ? "fab fa-fort-awesome" : (thisIcon === "all" ? "fas fa-globe-europe" : "fas fa-users")

    return (
        <>
            <button className={`Header-Tabs ${thisIcon}-tab`} onClick={iconClickHandler} >
                <i id={iconCurrenlyClicked === `${thisIcon}` ? `${thisIcon}-icon-active` : `${thisIcon}-icon`}
                    className={`${faIconClass} Header-icon`}>
                </i>
                <div className={iconCurrenlyClicked === `${thisIcon}` ? `icon-text ${thisIcon} active` : "icon-text"}>
                    {thisIcon}
                </div>
            </button>
        </>
    )
}

// Custom Tab for Profile Page
export const ProfileTab = ({ tabClicked, tabHandler, type }) => {
    const iconName = () => {
        switch (type) {
            case "posts":
                return <i className="fas fa-scroll"></i>
            case "liked posts":
                return <i className="fas fa-heart"></i>
            case "allegiances":
                return <i className="fas fa-handshake"></i>
            default:
                return <i className="fas fa-flag"></i>
        }
    }

    return (
        <>
            <button
                className={`profile-tab ${tabClicked === type ? "active" : ""} ${type}`}
                onClick={tabHandler}
            >
                <div
                    className={`profile-tab-contents ${tabClicked === type ? "active" : ""} ${type}`}>
                    {iconName()}
                    <p>{type}</p>
                </div>
            </button>
        </>
    )
}