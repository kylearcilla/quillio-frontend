import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'

import './HomePage.css'
import MainView from '../../components/HomePage/MainView'
import SuggestView from '../../components/HomePage/SuggestView'
import LeftSideView from '../../components/HomePage/LeftSideView'

import getRandomList from '../../utilities/getRandomList'
import { AuthContext } from '../../authentication/AuthContext'
import { GET_USERS_QUERY } from '../../utilities/gqlTags'

// HomePage has 3 Parts
// 1. Left Side View - Login, Profile Preview
// 2. Main View - PostsView, UsersView
// 3. Right User Suggestions - UserSuggestions

const HomePage = () => {
    const { loading, data: { getUsers: users } = {} } = useQuery(GET_USERS_QUERY);
    const { data: userData } = useContext(AuthContext);

    const getBannermenList = () => {
        const randomUsers = getRandomList(userData.followers, 4);
        return randomUsers;
    }
    const getAllegiancesList = () => {
        const randomUsers = getRandomList(userData.following, 4);
        return randomUsers;
    }

    return (
        <div className="Home-Page">
            <LeftSideView
                loading={loading}
                userData={userData}
                followers={userData && getBannermenList()}
                following={userData && getAllegiancesList()}
            />
            <div className="Right">
                <div className="Home">
                    <MainView loading={loading} users={users} />
                </div>
                <div className="SuggestBar"  >
                    <SuggestView loading={loading} users={users} />
                </div>
            </div>
        </ div >
    );
}

export default HomePage