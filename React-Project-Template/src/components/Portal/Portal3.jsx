import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, NavLink } from "react-router-dom";
import BorrowBook from '../../Containers/Book/BorrowBook';
//import BorrowBook from '../../Containers/Book/BorrowBook2';
import Style from './index.module.scss';
import { Layout, Menu } from 'antd';
import createBrowserHistory from 'history'

const { Header, Content } = Layout;



export default class Portal extends Component {
    render() {
        return (
            <Router history={createBrowserHistory}>
                <div className={Style.portalRoot}>
                    <div className={Style.topHead}>
                        <Layout >
                            <Header className={Style.header}>
                                <div className={Style.logo} >图书借阅管理系统</div>
                                <Menu
                                    theme="light"
                                    mode="horizontal"
                                    defaultSelectedKeys={['2']}
                                    style={{ lineHeight: '64px' }}
                                > 
                                    <Menu.Item key="6"><NavLink to="/user/book/borrow">借书</NavLink></Menu.Item>     
                                    <Menu.Item key="6"><NavLink to="/user/book/borrow2">还书</NavLink></Menu.Item>                                 
                                </Menu>
                            </Header>
                            <Content style={{ padding: '0 50px' }}>
                                <Switch>
                                    <Redirect exact from="/" to="/user/book/borrow" />
                                    <Route exact path="/user/book/borrow" component={BorrowBook} />
                                    <Route exact path="/user/book/borrow2" component={Borrow2Book} />
                                </Switch>

                            </Content> 

                        </Layout>
                    </div>

                </div>
            </Router>
        )
    }
}