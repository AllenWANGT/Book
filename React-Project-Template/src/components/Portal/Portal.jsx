import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import signin from '../../Containers/signin/signin';
import  mainPage  from './Portal2';
import {createBrowserHistory} from 'history'
const axios = require('axios');

export default class Portal extends Component {
    render() {
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3005/user/isLogin').then((data) => {
            //console.log(data.data);
        })
        return (
            <Router history={createBrowserHistory }>
                <Switch> 
                    <Redirect exact from="/" to="/login"/>
                    <Route exact path="/login" component={signin}/>
                    <Route exact path="/admin" component={mainPage}/>
                    <Route exact path="/admin/*" component={mainPage}/>  
                </Switch>
            </Router>
        )
    }
}



