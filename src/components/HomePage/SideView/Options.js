import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../authentication/AuthContext'

// The 'triple-dot' options menu components - users can logout, or view profile
const Options = ({ user }) => {
    const { logout } = useContext(AuthContext);
    const history = useHistory();
    const [isOptionClicked, setOptionClicked] = useState(false);
    const handleLogOut = () => { logout(); window.location.reload(); }

    return (
        <div>
            <button onClick={() => (setOptionClicked(!isOptionClicked))}> ••• </button>
            <div className="modal" style={isOptionClicked ? { display: 'block' } : { display: 'none' }}>
                <div><button onClick={() => { history.push(`users/${user.id}`) }}>View Profile</button></div>
                <div><button onClick={handleLogOut}>Log Out</button></div>
            </div>
        </div>
    )
}

export default Options
