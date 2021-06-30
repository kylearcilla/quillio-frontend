import React from 'react'

// all-purpose button (ex. submitting Register Fields...)
export const Button = ({ homeLoading, buttonHandler, text, type = "" }) => {
    const isLoading = type.includes("loading");
    return (
        <div>
            <button onClick={buttonHandler} disabled={isLoading || homeLoading}
                className={`button ${type} ${isLoading ? "loading" : ""}`
                }>
                {text}
            </button>
        </div>
    )
}