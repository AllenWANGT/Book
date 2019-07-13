import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, NavLink } from "react-router-dom";
import StudentForm from '../../Containers/StudentForm/StudentForm';
import StudentList from '../../Containers/StudentList/StudentList';
import BookList from '../../Containers/Book/BookList';
import NewBook from '../../Containers/Book/NewBook';
import Style from './index.module.scss'
import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

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
                                    <Menu.Item key="1"><NavLink to="/book">图书列表</NavLink></Menu.Item>
                                    <Menu.Item key="2"><NavLink to="/book/new">新增图书</NavLink></Menu.Item>
                                    <Menu.Item key="3"><NavLink to="/student">学员列表</NavLink></Menu.Item>
                                    <Menu.Item key="4"><NavLink to="/student/new">新增学员</NavLink></Menu.Item>
                                </Menu>
                            </Header>
                            <Content style={{ padding: '0 50px' }}>
                              
                                    <Switch>
                                        <Redirect exact from="/" to="/book" />
                                        <Route exact path="/book" component={BookList} />
                                        <Route exact path="/book/new" component={NewBook} />
                                        <Route exact path="/student" component={StudentForm} />
                                        <Route exact path="/student/new" component={StudentList} />
                                    </Switch>
                                
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                        </Layout>
                    </div>
                    
                </div>
            </Router>
        )
    }
}



