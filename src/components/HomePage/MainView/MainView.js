import React, { useState, useContext } from 'react'
import { useQuery } from '@apollo/client'

import './MainView.css';
import HeaderView from './HeaderView/HeaderView';
import PostsView from './PostsView/PostsView';
import UsersView from './UsersView/UsersView'
import { AuthContext } from '../../../authentication/AuthContext'
import { GET_POSTS_QUERY, GET_FOLLOWING_POSTS_QUERY } from '../../../utilities/gqlTags'

// MainView that houses - HeaderTabs + SearchBar, PostsView, UsersView
// This component rerenders everyime a user is followed, since curretUser's follow array is being updated
const MainView = ({ users }) => {
    const { data } = useContext(AuthContext);
    const [iconClicked, setIconClicked] = useState("home");
    const [searchText, setSearchText] = useState("");

    const { loading, data: { getPosts: posts } = {} } = useQuery(GET_POSTS_QUERY);
    const { loading: loading2, data: { getFollowingPosts: followingPosts } = {} } = useQuery(GET_FOLLOWING_POSTS_QUERY);

    const iconClickHandler = (e) => {
        const tabText = e.currentTarget.textContent.toLowerCase();
        setSearchText("");
        setIconClicked(tabText);
    }
    const searchInputHandler = (e) => {
        setSearchText(e.target.value);
    }

    const filterUsers = (iconClicked === "westerlings") && users && users.filter((u) => {
        const text = new RegExp(searchText, 'i');
        return u.name.match(text) || u.houseName?.match(text) || u.username.match(text)
    });
    const filterFollowingPosts = ((data && iconClicked === "home") && followingPosts) && followingPosts.filter((f) => {
        const text = new RegExp(searchText, 'i');
        return f.userInfo.name.match(text) || f.userInfo.houseName?.match(text) ||
            f.userInfo.username.match(text) || f.body.match(text)
    });
    const filterPosts = (data && iconClicked === "all") || (!data) && (posts) && posts.filter((p) => {
        const text = new RegExp(searchText, 'i');
        return p.userInfo.name.match(text) || p.userInfo.houseName?.match(text) ||
            p.userInfo.username.match(text) || p.body.match(text)
    });

    return (
        <div className="HomeBar">
            <HeaderView
                iconClicked={iconClicked}
                iconClickHandler={iconClickHandler}
                searchText={searchText}
                searchInputHandler={searchInputHandler}
            />
            {iconClicked !== "westerlings" ? (!loading && !loading2 && (
                <PostsView
                    iconClicked={iconClicked}
                    followingPosts={data ? filterFollowingPosts : filterPosts}
                    posts={filterPosts}
                    user={data}
                    isFollowingPostsEmpty={followingPosts?.length === 0}
                />
            )) : <UsersView users={filterUsers} searchText={searchText} />
            }
        </div>
    )
}
export default MainView;