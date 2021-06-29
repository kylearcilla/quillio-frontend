import React, { useState, useEffect, useContext } from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../authentication/AuthContext'

import { FOLLOW_USER_MUTATION } from '../../utilities/gqlTags';

export const FollowButton = ({ user, type }) => {
    const { loginOrRegister, data: userData } = useContext(AuthContext);
    const history = useHistory();
    const [isFollowing, setFollowing] = useState(false);

    useEffect(() => {
        if (user && userData) {
            const flag = userData.following.some((f) => (f.username === user.username));
            setFollowing(flag);
        }
    }, [user, userData])

    const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
        update(_, { data: { followClicked: resultUserData } }) {
            const updatedUser = { ...userData, ...resultUserData }
            loginOrRegister(updatedUser);
        },
        variables: { userId: user.id }
    })

    const handleFollowClicked = () => {
        !userData && history.push("/login");
        followUser(); setFollowing(!isFollowing);
    }

    return (
        <>
            <div className={`${type}-card-btn-container`}>
                {!isFollowing ?
                    <button
                        onClick={handleFollowClicked}
                        className={`user-card-follow-btn following ${type}`}
                    >
                        <i className="far fa-handshake"></i>
                        <p>Bend the Knee.</p>
                    </button> :
                    <button
                        onClick={handleFollowClicked}
                        className={`user-card-follow-btn not-following ${type}`}
                    >
                        <i className="fas fa-handshake-slash"></i>
                        <i id="prof-pg-not-follow" className="fas fa-handshake"></i>
                        <p>Bent the Knee.</p>
                    </button>
                }
            </div>
        </>
    )
}