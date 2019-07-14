import React, { Component } from 'react'
import { } from 'antd';
import { Table, Divider, Tag, Button, Input } from 'antd';
import Style from './index.css'


const axios = require('axios');

const { Search } = Input;
const columns = [
    {
        title: '图书ID',
        dataIndex: 'id',
        key: 'id',

        //render: text => <a href="javascript:;">{text}</a>,
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '手机',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: '借书数量',
        dataIndex: 'count',
        key: 'count',
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <div>
                <Button type="primary">详情</Button>
                <Button type="danger" >删除</Button>
            </div>
        ),
    },


]
class Index extends Component {
    state = {
        data: 0
    }
    componentDidMount() {
        axios.get('http://localhost:3005/user/list').then((data) => {
            //console.log(data.data);
            this.setState({
                data: data.data
            });
        })
    }
    render() {
        return (
            <div> 
                <div className="search"><Search placeholder="请输入用户名称" onSearch={value => console.log(value)} enterButton /></div>
                <div><Table columns={columns} dataSource={this.state.data} /></div>
            </div >
        )
    }
}

export default Index;