import React, { Component } from 'react';
import { } from 'antd';
import { Table, Divider,message, Tag, Button, Input } from 'antd';
import Style from './index.css'
const axios = require('axios');

const { Search } = Input;

let history=0;

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
        title: '图书出版社',
        dataIndex: 'bookPublisher',
        key: 'bookPublisher',
    },
    {
        title: '图书状态',
        dataIndex: 'bookStatus',
        key: 'bookStatus',
        render: (text, record) => {

            const state = {
                color: record.bookStatus == 0 ? "green" : "red",
                status: record.bookStatus == 0 ? "未借" : "已借",
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

            const state = {
                status: record.bookStatus == 0 ? false : true,
            }

            return (
                <div>
                    <Button type="primary" disabled={state.status} onClick={borrowBook.bind(this, record.bookId)}>借阅</Button>
                </div>
            )
        },
    },


];
const borrowBook = (bookId) => {
    axios.post('http://localhost:3005/borrow/create', {
        bookId: bookId
    }).then((data) => {
        //console.log(data.data);
        if (data.data.state == 1) {
            axios.post('http://localhost:3005/book/borrow', {
                bookId: bookId
            }).then((data) => {
                if(data.data.state==1){
                    message.success(data.data.message);
                    history.push('/borrowBook')
                }else{
                    message.error(data.data.message)
                }
            })
        }
    })
}



class index extends Component {
    state = {
        data: 0
    }




    componentDidMount() {
        axios.get('http://localhost:3005/book/list').then((data) => {
            //console.log(data.data);
            this.setState({
                data: data.data.data
            });
        })
    }

    getBooks = (value) => {
        console.log(value);
        axios.get('http://localhost:3005/book/list', {
            params: {
                bookName: value,
            }
        }).then((data) => {
            //console.log(data.data);
            if(data.data.state==1){
                this.setState({
                    data: data.data.data
                });
            }      
        })
    }

    render() {
        history=this.props.history;
        return (
            <div>
                <div className="search">
                    <Search placeholder="请输入图书名称" onSearch={value => this.getBooks(value)} enterButton />
                </div>
                <div><Table columns={columns} dataSource={this.state.data}/></div>
            </div>
        )
    }
}


export default index;