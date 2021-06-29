import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthContext } from '../authentication/AuthContext'

// prevents users from entering the Login and Register pages when logged in
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { data: user } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) => {
                return user ? <Redirect to="/" /> : <Component {...props} />;
            }}
        >
        </Route>
    )
}

export default PrivateRoute
