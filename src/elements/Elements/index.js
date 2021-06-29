import React from 'react'
import WESTOROS_ART from '../../images'

// Different misc. components used throughout the app

export const AppDetails = ({ type }) => {
    return (
        <div className={`app-details ${type}`}>
            This is a twitter-esque, GOT-inspired social media app made and designed just for fun by Kyle Arcilla.
            Made using ReactJS, HTML, CSS, Express, Node, MongoDB, GQL, and Cloudinary.
        </div>
    )
}

// UserInputErrors for the Register and Login Pages
export const ErrorDetails = ({ type, errors = {} }) => {
    return (
        <div className={`error-details ${type}`} >
            <ul>
                {
                    Object.values(errors).map((error) => (
                        <li className={`list-error-item ${type}`} key={error}> {error} </li>
                    ))
                }
            </ul>
        </div>
    )
}

// Randomized Westoros Art for the Login/Register Pages
export const WestrosArtImage = () => {
    const selectRandomImage = () => {
        const index = Math.floor(Math.random() * 10);
        return Object.values(WESTOROS_ART)[index];
    }

    return (
        <>
            <div className="sign-in-up-img-container">
                <img src={selectRandomImage()} alt="sign-in-up-img-container" />
            </div>
        </>
    )
}
