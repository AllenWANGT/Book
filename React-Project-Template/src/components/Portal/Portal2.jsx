import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, NavLink } from "react-router-dom";
import UserForm from '../../Containers/User/UserForm';
import UserList from '../../Containers/User/NewUser';
import NewManage from '../../Containers/Manage/NewManage';
import Managelist from '../../Containers/Manage/Managelist';
import BookList from '../../Containers/Book/BookList';
import NewBook from '../../Containers/Book/NewBook';
import BorrowBook from '../../Containers/Book/BorrowBook';
import ReturnBook from '../../Containers/Book/ReturnBook';
import BorrowBookInfo from '../../Containers/Book/BorrowBookInfo';
import ReturnBookInfo from '../../Containers/Book/ReturnBookInfo';
import Style from './index.module.scss';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import {createBrowserHistory} from 'history'
// const menu = (
//     <Menu>
//         <Menu.Item>
//         <NavLink to="/admin/book">图书列表</NavLink>
//         </Menu.Item>
//         <Menu.Item>
//         <NavLink to="/admin/book/new">新增图书</NavLink>
//         </Menu.Item>
//     </Menu>
// );
// const menu2 = (
//     <Menu>
//         <Menu.Item>
//         <NavLink to="/admin/book/borrowInfo">借书审批</NavLink>
//         </Menu.Item>
//         <Menu.Item>
//         <NavLink to="/admin/book/returnInfo">还书审批</NavLink>
//         </Menu.Item>
//     </Menu>
// );
const axios = require('axios');
//axios.defaults.withCredentials = true;
const { Header, Content } = Layout;
let show1 = 'none';
let show2 = 'none';
let show3 = 'none';
export default class Portal extends Component {
    // state = {
    //     show1: 'none',
    //     show2: 'none',
    //     show3: 'none'
    // };
    componentDidMount() {

        // this.setState({
        //     show1: this.props.location.state.show1,
        //     show2: this.props.location.state.show2,
        //     show3: this.props.location.state.show3,
        // })
        // show1= this.props.location.state.show1;
        // show2= this.props.location.state.show2;
        // show3= this.props.location.state.show3;
        // console.log(show2);
        // axios.defaults.withCredentials = true;
        // axios.post('http://localhost:3005/user/isLogin').then((data) => {
        //     //console.log(data.data);
        // })
    }

    render() {
        show1 = this.props.location.state.show1;
        show2 = this.props.location.state.show2;
        show3 = this.props.location.state.show3;
        console.log(show2);

        //console.log(this.props.location.state.name);
        return (
            <Router history={createBrowserHistory}>
                <div className={Style.portalRoot}>
                    <div className={Style.topHead}>
                        <Layout >
                            <Header className={Style.header} >
                                <div className={Style.logo}>图书借阅管理系统</div>
                                <Menu
                                    theme="black"
                                    mode="horizontal"
                                    defaultSelectedKeys={['2']}
                                    style={{ lineHeight: '64px' }}
                                >
                                    {/* <Dropdown overlay={menu} style={{display:this.state.show1}}>
                                            <a className="ant-dropdown-link" style={{display:this.state.show1}}>
                                                图书管理 <Icon type="down" />
                                            </a>
                                        </Dropdown>
                                    <Menu.Item key="3" style={{display:this.state.show1}}><NavLink to="/admin/student" >用户管理</NavLink></Menu.Item>
                                    <Dropdown overlay={menu2} style={{display:this.state.show1}}>
                                        <a className="ant-dropdown-link" style={{display:this.state.show1}} >
                                            审批管理 <Icon type="down" />
                                        </a> */}
                                    {/* </Dropdown> */}
                                    <Menu.Item key="1" style={{ display: show1 }}> <NavLink to="/admin/book">图书列表</NavLink></Menu.Item>
                                    <Menu.Item key="2" style={{ display: show1 }}> <NavLink to="/admin/book/new">新增图书</NavLink></Menu.Item>
                                    <Menu.Item key="3" style={{ display: show1 }}><NavLink to="/admin/student" >用户管理</NavLink></Menu.Item>
                                    <Menu.Item key="4" style={{ display: show1 }}><NavLink to="/admin/book/borrowInfo">借书审批</NavLink></Menu.Item>
                                    <Menu.Item key="6" style={{ display: show1 }}><NavLink to="/admin/student/new">新增用户</NavLink></Menu.Item>
                                    <Menu.Item key="7" style={{ display: show2 }}><NavLink to="/admin/book/borrow" >借书</NavLink></Menu.Item>
                                    <Menu.Item key="8" style={{ display: show2 }}><NavLink to="/admin/book/return" >还书</NavLink></Menu.Item>
                                    <Menu.Item key="10" style={{ display: show3 }}><NavLink to="/admin/manage/list">管理员列表</NavLink></Menu.Item>
                                    <Menu.Item key="9" style={{ display: show3 }}><NavLink to="/admin/manage/new">创建管理员</NavLink></Menu.Item>
                                </Menu>
                            </Header>
                            <Content style={{ padding: '0 50px' }}>
                                <Switch>
                                    <Redirect exact from="/" to="/admin/book" />
                                    <Redirect exact from="/borrow" to="/admin/book/borrowInfo" />
                                    <Redirect exact from="/user" to="/admin/student" />
                                    <Redirect exact from="/borrowBook" to="/admin/book/borrow" />
                                    <Redirect exact from="/returnBook" to="/admin/book/return" />
                                    <Redirect exact from="/admins" to="/admin/manage/list" />
                                    <Route exact path="/admin/book" component={BookList} />
                                    <Route exact path="/admin/book/new" component={NewBook} />
                                    <Route exact path="/admin/student" component={UserForm} />
                                    <Route exact path="/admin/student/new" component={UserList} />
                                    <Route exact path="/admin/book/borrow" component={BorrowBook} />
                                    <Route exact path="/admin/book/return" component={ReturnBook} />
                                    <Route exact path="/admin/book/borrowInfo" component={BorrowBookInfo} />
                                    <Route exact path="/admin/book/returnInfo" component={ReturnBookInfo} />
                                    <Route exact path="/admin/manage/new" component={NewManage} />
                                    <Route exact path="/admin/manage/list" component={Managelist} />
                                </Switch>

                            </Content>

                        </Layout>
                    </div>

                </div>
            </Router>
        )
    }
}