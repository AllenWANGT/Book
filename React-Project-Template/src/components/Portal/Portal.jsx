import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import signin from '../../Containers/signin/signin';
import  mainPage  from './Portal2';
import userPage from './Portal3';
import createBrowserHistory from 'history'


export default class Portal extends Component {
    render() {
        return (
            <Router history={createBrowserHistory }>
                <Switch> 
                    <Redirect exact from="/" to="/login"/>
                    <Route exact path="/login" component={signin}/>
                    <Route exact path="/admin" component={mainPage}/>
                    <Route exact path="/admin/*" component={mainPage}/> 
                    <Route exact path="/user" component={userPage}/> 
                    <Route exact path="/user/*" component={userPage}/>  
                </Switch>
            </Router>
        )
    }
}



