import React from 'react'

// InputForms for Registers and Login Views, useForm hook is used
export const SignForm = ({ textValue, inputHandler, title = "", type = "", errors, placeholder }) => {
    const isPassword = title.includes("Password");

    return (
        <div className={`sign-form-container ${type}`}>
            <h3 className={`sign-form-title ${type}`}>
                {title}
            </h3>
            <form>
                <input
                    className={`sign-form-input ${type} ${errors ? "errors" : ""}`}
                    type={isPassword ? "password" : "text"}
                    value={textValue}
                    onChange={inputHandler}
                    placeholder={placeholder}
                    spellCheck="false"
                >
                </input>
            </form>
        </div>
    )
}