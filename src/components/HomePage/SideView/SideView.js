import { useState } from 'react'

import UserPreview from './UserPreview'
import LogInPreview from './LogInPreview'

import "./SideView.css"

// Side view component - for Login and view Current User Profile
const SideView = ({ setIsSideViewPressed, userData, followers, following }) => {
    const [isBannermenClicked, setIsBannermenClicked] = useState(true);

    return (
        <>
            <div className="side-view-container">
                {userData ? <UserPreview
                    user={userData}
                    setIsSideViewPressed={setIsSideViewPressed}
                    isBannermenClicked={isBannermenClicked}
                    setIsBannermenClicked={setIsBannermenClicked}
                    followers={followers} following={following}

                /> : <LogInPreview />}
            </div>
        </>
    )
}

export default SideView;