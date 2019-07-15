import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, NavLink } from "react-router-dom";
import UserForm from '../../Containers/User/UserForm';
import UserList from '../../Containers/User/NewUser';
import BookList from '../../Containers/Book/BookList';
import NewBook from '../../Containers/Book/NewBook';
import BorrowBook from '../../Containers/Book/BorrowBook';
import signin from '../../Containers/signin/signin';
import Style from './index.module.scss';
import { Layout, Menu, Dropdown, Icon } from 'antd';

const { Header, Content } = Layout;



export default class Portal extends Component {
    render() {
        return (
            <Router>
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
                                   
                                    <Menu.Item key="2"><NavLink to="/book">图书列表</NavLink></Menu.Item>
                                    <Menu.Item key="1"> <NavLink to="/book/new">新增图书</NavLink></Menu.Item>
                                    <Menu.Item key="3"><NavLink to="/student">用户列表</NavLink></Menu.Item>
                                    <Menu.Item key="4"><NavLink to="/student/new">新增用户</NavLink></Menu.Item>
                                    <Menu.Item key="6"><NavLink to="/book/borrow">借书</NavLink></Menu.Item>
                                    
                                </Menu>
                            </Header>
                            <Content style={{ padding: '0 50px' }}>
                                <Switch>
                                    
                                    <Route exact path="/book" component={BookList} />
                                    <Route exact path="/book/new" component={NewBook} />
                                    <Route exact path="/student" component={UserForm} />
                                    <Route exact path="/student/new" component={UserList} />
                                    <Route exact path="/book/borrow" component={BorrowBook} />
                                </Switch>

                            </Content>

                        </Layout>
                    </div>

                </div>
            </Router>
        )
    }
}



