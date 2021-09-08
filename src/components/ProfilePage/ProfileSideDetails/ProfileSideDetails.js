import { useContext, useState, useEffect } from 'react'
import moment from 'moment'

import './ProfileSideDetails.css'
import { AuthContext } from '../../../authentication/AuthContext'
import { UserCardList } from '../../../elements'
import getRandomList from '../../../utilities/getRandomList'

// Side details - edit profile view & user suggestions for Profile Page
const ProfileSideDetails = ({ user = {}, users, onClickEdit }) => {
    const { data: currentUser } = useContext(AuthContext);
    const [randomUsers, setRandomUsers] = useState([]);

    useEffect(() => { setRandomUsers(getRandomList(users, 6)) }, [])

    return (
        <div className="profile-page-right">
            <div className="profile-side-details"
                style={currentUser && currentUser.username === user.username ? { display: "block" } : { display: "none" }}
            >
                <div className="profile-account-details">
                    <div className="header">
                        <h3>Account Details</h3>
                        <button onClick={onClickEdit}>
                            <p>Edit Profile</p>
                            <i className="fas fa-edit"></i>
                        </button>
                    </div>
                    <div className="details-container">
                        <div className="detail">
                            <i className="far fa-envelope"></i>
                            <div className="detail-text">
                                <p className="title">Email</p>
                                <p className="subtitle">{user.email}</p>
                            </div>
                        </div>
                        <div className="detail">
                            <i className="far fa-calendar-alt"></i>
                            <div className="detail-text">
                                <p className="title">Joined</p>
                                <p className="subtitle">{moment(user.createdAt).format("MMM YYYY")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="suggestions-list profile">
                <h3 className="suggestions-title-profile">Westerlings</h3>
                <div className="suggestions-list">
                    <UserCardList type="suggestion" cards={(randomUsers)} />
                </div>
            </div>
        </div>
    )
}

export default ProfileSideDetails