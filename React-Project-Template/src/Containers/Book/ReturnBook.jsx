import React, { Component } from 'react';
import { } from 'antd';
import { Table, Divider, Tag, Button, Input } from 'antd';
import Style from './index.css'
const axios = require('axios');

const { Search } = Input;



const columns = [
    {
        title: '图书Isbn',
        dataIndex: 'bookIsbn',
        key: 'bookIsbn',

    },
    {
        title: '图书名称',
        dataIndex: 'bookName',
        key: 'bookName',
    },
    {
        title: '图书作者',
        dataIndex: 'bookAuthor',
        key: 'bookAuthor',
    },
    {
        title: '图书状态',
        dataIndex: 'bookStatus',
        key: 'bookStatus',
        render: (text, record) => {
            
            const state = {
                 color : record.bookStatus == 0 ? "green" : "red",
                 status : record.bookStatus == 0 ? "未借" : "已借",
            }
            
            return (
                <div>
                    <Tag color={state.color}>{state.status}</Tag>
                </div>
            )
        },
    },
    
    {
        title: '操作',
        key: 'action',
        render: (text, record) => {
            
            const state ={
                 status : record.bookStatus == 0? false : true,
            }
           
            return(
                <div>
                    <Button type="primary" disabled={state.status}>还书</Button>
                    <Button type="dashed" >详情</Button>
                </div>
            )
        },
    },


];



class index extends Component {
    state = {
        data: 0
    }




    componentDidMount() {
        axios.get('http://localhost:3005/book/list').then((data) => {
            console.log(data.data);
            this.setState({
                data: data.data
            });
        })
    }

    render() {
        return (
            <div>
                <div className="search">
                    <Search placeholder="请输入图书名称" onSearch={value => console.log(value)} enterButton />
                </div>
                <div><Table columns={columns} dataSource={this.state.data} /></div>
            </div>
        )
    }
}


export default index;