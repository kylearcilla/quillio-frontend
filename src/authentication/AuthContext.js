import { useReducer, createContext } from 'react'
import jwtDecode from 'jwt-decode'

const initialState = {
    data: null
}

const token = localStorage.getItem("jwtToken");
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userData");
    } else {
        initialState.data = JSON.parse(localStorage.getItem("userData"));
    }
}

const AuthContext = createContext({
    data: null,
    login: () => { },
    logout: () => { }
})

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

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    function loginOrRegister(userData) {
        if (userData.token) localStorage.setItem("jwtToken", userData.token);
        localStorage.setItem("userData", JSON.stringify(userData));

        dispatch({ type: 'LOGIN', data: userData });
    }

    function logout() {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userData");
        dispatch({ type: 'LOGOUT' });
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