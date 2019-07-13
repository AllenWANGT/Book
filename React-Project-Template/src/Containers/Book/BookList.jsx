import React, { Component } from 'react';
import { } from 'antd';
import { Table, Divider, Tag, Button, Input } from 'antd';
import Style from './index.css'
const axios = require('axios');

const { Search } = Input;

const deleteBook = (bookId) => {
    axios.get('http://localhost:3005/book/delete?bookId=' + bookId).then(() => {
        axios.get('http://localhost:3005/book/list').then((data) => {
            console.log(data.data);
            this.setState({
                data: data.data,
            });
        });
    })
};

const columns = [
    {
        title: '图书Isbn',
        dataIndex: 'bookIsbn',
        key: 'bookIsbn',

        //render: text => <a href="javascript:;">{text}</a>,
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
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <div>
                <Button type="primary">编辑</Button>
                <Button type="dashed" >详情</Button>
                <Button type="danger" >删除</Button>
            </div>
        ),
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
                    <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                </div>
                <div><Table columns={columns} dataSource={this.state.data} /></div>
            </div>
        )
    }
}


export default index;