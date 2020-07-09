import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import cookie from 'cookie'
import Home from './components/Home'
import About from './components/About'
import Car from './components/Car'
import Login from './components/Login'

// Check the cookies for a cookie called "loggedIn"

//use this function to check cookie for authorization
const checkAuth = () => {
    const cookies = cookie.parse(document.cookie)
    return cookies["loggedIn"] ? true : false
}

//created protected route function to know which components should be displayed.
const ProtectedRouteComponent  = ({component: Component, ...rest}) => {
    return (
        <Route
        {...rest}
        render={(props) => checkAuth()
            ? <Component {...props} />
            : <Redirect to="/login" />}
        />
    )
}


const Router = () => {
    return (
        <Switch>
            <Route path="/login" component={Login} />
            <ProtectedRouteComponent exact path="/" component={Home} />
            <ProtectedRouteComponent  path="/about" component={About} />
            <ProtectedRouteComponent  path="/car/:id" component={Car} />
        </Switch>
    );
};

export default Router;