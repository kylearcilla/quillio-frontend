import React from 'react'

import './UsersView.css'
import { UserCardList } from '../../../../elements'

const UsersView = ({ users }) => {
    return (
        <div className="home-users-view">
            {(users) && <UserCardList type="user-result" cards={users} />}
        </div>
    )
}

export default UsersView