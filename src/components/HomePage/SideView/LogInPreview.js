import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/client'

import { SignForm, Button, AppDetails, ErrorDetails } from '../../../elements'
import { LOGIN_USER_MUTATION } from '../../../utilities/gqlTags'
import { AuthContext } from '../../../authentication/AuthContext'
import useForm from '../../../utilities/useForm'

// an additional login component for the Home Page
const LogInPreview = ({ loading: homeLoading }) => {
    const [errors, setErrors] = useState({});
    const { loginOrRegister } = useContext(AuthContext);
    const { onChangeHandler, onSubmitHandler, values } = useForm(callback, {
        username: '',
        password: '',
    })

    const [loginUser, { loading }] = useMutation(LOGIN_USER_MUTATION, {
        update(_, { data: { login: userData } }) {
            loginOrRegister(userData);
            window.location.reload();
        },
        onError(err) {
            if (!err.graphQLErrors[0]) return;
            const errorsObject = { ...err.graphQLErrors[0].extensions.exception.errors };
            setErrors({ ...errorsObject });
        },
        variables: values
    })
    function callback() { loginUser(); }

    return (
        <div className="login-side-preview-container">
            <div className="login-side-logo">
                <h1> Quillio </h1>
                <i className="fas fa-feather-alt"></i>
            </div>
            <p className="login-description">
                Log in or register and become a part of the largest online social
                media community of the 7 kingdoms of Westoros!
            </p>
            <div className="login-inputs-container">
                <SignForm
                    textValue={values.username}
                    inputHandler={onChangeHandler}
                    title={"Username"}
                    type="login-in-preview username"
                    errors={errors.username ? true : false}
                />
                <SignForm textValue={values.password}
                    inputHandler={onChangeHandler}
                    title={"Password"}
                    type="login-in-preview password"
                    errors={errors.password ? true : false}
                />
            </div>
            <div className="login-side-btn-container">
                <Button
                    homeLoading={homeLoading}
                    text={"Login!"}
                    type={`log-in-preview ${loading ? "loading" : ""}`}
                    buttonHandler={onSubmitHandler}
                />
            </div>
            <a href="/register">
                <p className="login-signup-description"> Don’t have an account? Sign Up! </p>
            </a>
            <a href="/login">
                <p className="login-signup-description small"> You are not logged in. Log in or sign up! </p>
            </a>
            <div className="login-in-preview-error-display">
                <ErrorDetails type="log-in-preview" errors={errors} />
            </div>
            <div className="login-bottom-details-container">
                <AppDetails type="log-in-view" />
            </div>
        </div>
    )
}

export default LogInPreview