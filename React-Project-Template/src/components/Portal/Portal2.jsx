import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, NavLink } from "react-router-dom";
import UserForm from '../../Containers/User/UserForm';
import UserList from '../../Containers/User/NewUser';
import NewManage from '../../Containers/Manage/NewManage';
import BookList from '../../Containers/Book/BookList';
import NewBook from '../../Containers/Book/NewBook';
import BorrowBook from '../../Containers/Book/BorrowBook';
import BorrowBookInfo from '../../Containers/Book/BorrowBookInfo'
import Style from './index.module.scss';
import { Layout, Menu} from 'antd';
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
                                    <Menu.Item key="2"><NavLink to="/admin/book">图书列表</NavLink></Menu.Item>
                                    <Menu.Item key="1"> <NavLink to="/admin/book/new">新增图书</NavLink></Menu.Item>
                                    <Menu.Item key="3"><NavLink to="/admin/student">用户列表</NavLink></Menu.Item>
                                    <Menu.Item key="4"><NavLink to="/admin/student/new">新增用户</NavLink></Menu.Item>
                                    <Menu.Item key="6"><NavLink to="/admin/book/borrow">借书</NavLink></Menu.Item> 
                                    <Menu.Item key="7"><NavLink to="/admin/book/borrowInfo">借书信息</NavLink></Menu.Item>                                    
                                     <Menu.Item key="8"><NavLink to="/admin/manage/new">管理员信息</NavLink></Menu.Item> 
                                </Menu>
                            </Header>
                            <Content style={{ padding: '0 50px' }}>
                                <Switch>
                                    <Redirect exact from="/" to="/admin/book" />
                                    <Route exact path="/admin/book" component={BookList} />
                                    <Route exact path="/admin/book/new" component={NewBook} />
                                    <Route exact path="/admin/student" component={UserForm} />
                                    <Route exact path="/admin/student/new" component={UserList} />
                                    <Route exact path="/admin/book/borrow" component={BorrowBook} />
                                    <Route exact path="/admin/book/borrowInfo" component={BorrowBookInfo} />
                                    <Route exact path="/admin/manage/new" component={NewManage} />
                                </Switch>

                            </Content> 

                        </Layout>
                    </div>

                </div>
            </Router>
        )
    }
}




