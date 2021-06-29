import React from 'react'

import './AuthPage.css'
import FormView from '../../components/AuthPage/FormView'
import { AppDetails, WestrosArtImage } from '../../elements'

// The form part of the page is separated from the "art" portion to avoid image rerenders
const RegisterView = () => {

    return (
        <div className="Sign-In-Up-Page">
            <div className="sign-in-up-page-left">
                <div className="sign-in-up-page-title">
                    <h1> Quillio </h1> <i className="fas fa-feather-alt"></i>
                </div>
                <div className="sign-in-up-inputs-outer-container">
                    <FormView type="register" />
                </div>
                <AppDetails type="sign-in-up" />
            </div>
            <div className="sign-in-up-page-right">
                <WestrosArtImage />
            </div>
        </div>
    )
}

export default RegisterView