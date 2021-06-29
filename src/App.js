import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';

import PrivateRoute from './utilities/PrivateRoute'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/AuthPage/RegisterPage'
import LoginPage from './pages/AuthPage/LoginPage'
import PostPage from './pages/PostPage/PostPage';

import { AuthProvider } from './authentication/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App" >
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/users/:userId" component={ProfilePage} />
            <Route exact path="/posts/:postId" component={PostPage} />
            <PrivateRoute exact path="/login" component={LoginPage} />
            <PrivateRoute exact path="/register" component={RegisterPage} />
          </Switch>
        </div >
      </Router>
    </AuthProvider>
  );
}
export default App;