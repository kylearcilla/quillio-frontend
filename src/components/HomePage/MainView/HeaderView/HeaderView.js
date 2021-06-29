import React from 'react'
import './HeaderView.css';
import { HomeHeaderTab, SearchForm } from '../../../../elements'

// Displays the tabs & the search bar
const HeaderView = ({ iconClicked, iconClickHandler, searchText, searchInputHandler }) => {
    const highlighterType = iconClicked === "home" ? "home" : (iconClicked === "all" ? "all" : "westerlings");

    return (
        <>
            <div className="Header">
                <div className="Header-Left">
                    <HomeHeaderTab
                        iconCurrenlyClicked={iconClicked}
                        thisIcon="home"
                        iconClickHandler={iconClickHandler}
                    />
                    <HomeHeaderTab
                        iconCurrenlyClicked={iconClicked}
                        thisIcon="all"
                        iconClickHandler={iconClickHandler}
                    />
                    <HomeHeaderTab
                        iconCurrenlyClicked={iconClicked}
                        thisIcon="westerlings"
                        iconClickHandler={iconClickHandler}
                    />
                    <div className={`tab-higlighter ${highlighterType}`}>
                    </div>
                </div>
                <div className="Header-Right">
                    <SearchForm
                        searchText={searchText}
                        searchInputHandler={searchInputHandler}
                        tabType={iconClicked}
                    />
                </div>
            </div>
        </>
    )
}
export default HeaderView;