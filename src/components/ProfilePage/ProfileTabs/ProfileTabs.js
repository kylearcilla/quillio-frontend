import React from 'react'
import './ProfileTabs.css'

import { ProfileTab } from '../../../elements'

const ProfileTabs = ({ tabClicked, tabHandler }) => {
    return (
        <div className="profile-tabs">
            <ProfileTab
                tabClicked={tabClicked}
                tabHandler={tabHandler}
                type="posts"
            />
            <ProfileTab
                tabClicked={tabClicked}
                tabHandler={tabHandler}
                type="liked posts"
            />
            <ProfileTab
                tabClicked={tabClicked}
                tabHandler={tabHandler}
                type="allegiances"
            />
            <ProfileTab
                tabClicked={tabClicked}
                tabHandler={tabHandler}
                type="bannermen"
            />
        </div>
    )
}
export default ProfileTabs