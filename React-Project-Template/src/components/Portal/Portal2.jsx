import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, NavLink } from "react-router-dom";
import UserForm from '../../Containers/User/UserForm';
import UserList from '../../Containers/User/NewUser';
import BookList from '../../Containers/Book/BookList';
import NewBook from '../../Containers/Book/NewBook';
import BorrowBook from '../../Containers/Book/BorrowBook';
import signin from '../../Containers/signin/signin';
import Style from './index.module.scss';
import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

export default class Portal2 extends Component {
    render() {
        return (
            <Router>        
                <Switch>
                    <Redirect exact from="/" to="/" />
                        <Route exact path="/login" component={signin} />
                </Switch>
                                
                        
                            
    
            </Router>
        )
    }
}



