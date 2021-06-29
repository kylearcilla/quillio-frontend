import React from 'react'
import '../../components/HomePage/MainView/HeaderView/HeaderView.css';

// Search Forms for the Search Post/User functionality in HomeView
export const SearchForm = ({ searchText, searchInputHandler, tabType }) => {
    const searchType = (tabType === "home" || tabType === "all") ? "Quest for posts." : "Quest for westerlings."

    return (
        <div>
            <button className="HomeView-search-button">
                <i id="search-icon" className="fas fa-search"></i>
            </button>
            <input
                className="search-bar HomeView"
                onChange={searchInputHandler}
                value={searchText}
                type="text"
                placeholder={searchType}
                spellCheck="false"
            />
        </div>
    )
}