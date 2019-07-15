import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, NavLink } from "react-router-dom";
import UserForm from '../../Containers/User/UserForm';
import UserList from '../../Containers/User/NewUser';
import BookList from '../../Containers/Book/BookList';
import NewBook from '../../Containers/Book/NewBook';
import BorrowBook from '../../Containers/Book/BorrowBook';
import signin from '../../Containers/signin/signin';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import  mainPage  from './Portal2';
import createBrowserHistory from 'history'


export default class Portal extends Component {
    render() {
        return (
            <Router history={createBrowserHistory }>
                <Switch> 
                    <Redirect exact from="/" to="/login" />
                    <Route exact path="/login" component={signin}/>
                    <Route exact path="/admin" component={mainPage}/>  
                </Switch>
  
            </Router>
        )
    }
}



