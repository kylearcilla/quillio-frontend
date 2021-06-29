import React, { useState } from 'react'
import SideView from './SideView/SideView'

// Separate component to handle state management of side view state, prevent rerender of GET_USERS
const LeftSideView = ({ userData, followers, following }) => {
    const [isSideViewPressed, setIsSideViewPressed] = useState(false);

    return (
        <>
            <div className={isSideViewPressed ? "Sidebar clicked" : "Sidebar"}>
                <SideView
                    setIsSideViewPressed={() => { setIsSideViewPressed(!isSideViewPressed) }}
                    userData={userData}
                    followers={followers} following={following}
                />
            </div>
            <button onClick={() => { setIsSideViewPressed(!isSideViewPressed) }} className={isSideViewPressed ? "side-view-toggle-button-right clicked" : "side-view-toggle-button-right"}>
                <i className="fas fa-angle-double-right"></i>
            </button>
        </>
    )
}

export default LeftSideView
