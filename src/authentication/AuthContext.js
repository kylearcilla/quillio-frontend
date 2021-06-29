import { useReducer, createContext } from 'react'
import jwtDecode from 'jwt-decode'

const initialState = {
    data: null
}

// if user is logged in AND (user around for < 1h) THEN token is VALID
const token = localStorage.getItem("jwtToken");
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userData");
    } else {
        // token is not decoded to initalize user data because...
        // in the BackEnd, the token only takes in the user's id, name, username, email, so userData is not complete
        // thus, when login, all fields of user are fetched and stored, not just token
        initialState.data = JSON.parse(localStorage.getItem("userData"));
    }
}

const AuthContext = createContext({
    data: null,
    login: () => { },
    logout: () => { }
})

// refucer function, takes in a dispatched action & modifies state using it
function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                data: action.data
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
}

// Provides context (data & functions) all throughout the App Heiarchy
function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // this function is used everytime a user logs in or registers AND..
    // ...currentUserData needs to be updated
    // ...ex. current user just followed someone, so update current user's following prop
    function loginOrRegister(userData) {
        if (userData.token) {
            localStorage.setItem("jwtToken", userData.token);
        }
        localStorage.setItem("userData", JSON.stringify(userData));
        dispatch({
            type: 'LOGIN',
            data: userData
        });
    }

    function logout() {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userData");

        dispatch({
            type: 'LOGOUT'
        });
    }

    return (
        <AuthContext.Provider value={{
            user: state.user,
            data: state.data,
            loginOrRegister,
            logout
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }