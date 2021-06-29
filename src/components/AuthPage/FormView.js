import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import useForm from '../../utilities/useForm'
import { useMutation } from '@apollo/client'
import { AuthContext } from '../../authentication/AuthContext'
import { ErrorDetails, Button, SignForm } from '../../elements'

import { LOGIN_USER_MUTATION, REGISTER_USER_MUTATION } from '../../utilities/gqlTags'

// The "User-Input" part of Login/Register Pages - accomadates both login/register functionality
const FormView = ({ type }) => {
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const { loginOrRegister } = useContext(AuthContext);
    const { onChangeHandler, onSubmitHandler, values } = useForm(callback, {
        name: '', username: '', email: '',
        password: '', confirmPassword: ''
    })

    const [authenticateUser, { loading }] = useMutation(
        type === "login" ? LOGIN_USER_MUTATION : REGISTER_USER_MUTATION, {
        update(_, { data }) {
            loginOrRegister(data[type]);  // data.login or data.register
            if (type === "login") {
                history.push("/");
                window.location.reload();
                return;
            }
            history.push(`/users/${data.register.id}`)
            window.location.reload();
        },
        onError(err) {
            const errorsObject = { ...err.graphQLErrors[0]?.extensions.exception.errors };
            setErrors({ ...errorsObject });
        }
    })
    function callback() { authenticateUser({ variables: values }); }

    const errorsDisplay =
        <div className="sign-in-up-errors">
            <ErrorDetails type="log-in-view" errors={errors} />
        </div>

    const loginView = <>
        <div className="sign-in-up-inputs-container">
            <div className="sign-in-up-inputs-one-box">
                <SignForm
                    title="Username"
                    type="sign-in-up-page username"
                    errors={errors.username ? true : false}
                    textValue={values.username}
                    inputHandler={onChangeHandler}
                />
                <SignForm
                    title="Password"
                    type="sign-in-up-page password"
                    errors={errors.password ? true : false}
                    textValue={values.password}
                    inputHandler={onChangeHandler}
                />
            </div>
            <div className="sign-in-un-button-container">
                <Button
                    text={"Login!"}
                    type={`sign-in-up-page ${loading ? "loading" : ""}`}
                    buttonHandler={onSubmitHandler}
                />
            </div>
        </div>
        <div className="sign-in-up-bottom-info">
            <a href="/register" className="sign-in-up-link"> Don't have anccount yet? Sign up! </a>
        </div>
        {errorsDisplay}
    </>

    const registerView = <>
        <div className="sign-in-up-inputs-container">
            <div className="sign-in-up-inputs-two-box">
                <SignForm
                    title="Name"
                    type="sign-in-up-page name"
                    errors={errors.inputname ? true : false}
                    textValue={values.name}
                    inputHandler={onChangeHandler}
                />
                <SignForm
                    title="Username"
                    type="sign-in-up-page username"
                    errors={errors.username ? true : false}
                    textValue={values.username}
                    inputHandler={onChangeHandler}
                />
            </div>
            <div className="sign-in-up-inputs-one-box">
                <SignForm
                    title="Email"
                    type="sign-in-up-page email"
                    errors={errors.email ? true : false}
                    textValue={values.email}
                    inputHandler={onChangeHandler}
                />
            </div>
            <div className="sign-in-up-inputs-two-box">
                <SignForm
                    title="Password"
                    type="sign-in-up-page password"
                    errors={errors.password ? true : false}
                    textValue={values.password}
                    inputHandler={onChangeHandler}
                />
                <SignForm
                    title="Confirm Password"
                    type="sign-in-up-page confirmPassword"
                    errors={errors.confirmPassword ? true : false}
                    textValue={values.confirmPassword}
                    inputHandler={onChangeHandler}
                />
            </div>
            <div className="sign-in-un-button-container">
                <Button
                    text={"Register!"}
                    type={`sign-in-up-page ${loading ? "loading" : ""}`}
                    buttonHandler={onSubmitHandler}
                />
            </div>
        </div>
        <div className="sign-in-up-bottom-info">
            <a href="/login" className="sign-in-up-link"> Already have an account? Sign in! </a>
        </div>
        {errorsDisplay}
    </>

    return (<div> {type === "login" ? loginView : registerView} </div>)
}

export default FormView