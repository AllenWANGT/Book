import React, { Component } from 'react';
import { } from 'antd';
import { Table, Divider, Tag, Button, Input ,message} from 'antd';
import Style from './index.css'
import { Alert } from 'antd';
const axios = require('axios');
const { Search } = Input;
let history = 0;



const agreeBorrow = (userId,bookId,borrowState) => {
    //console.log(userId,userName,borrowState)
    axios.get('http://localhost:3005/borrow/update',{
        params:{
            userId:userId,
            bookId:bookId,
            borrowState:borrowState
        }
    }).then((data) => {
        history.push('/borrow');
        message.success('审核通过');        
    })
}


const columns = [
    {
        title: '用户Id',
        dataIndex: 'userId',
        key: 'userId',

    },
    {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
    },

    {
        title: '图书名',
        dataIndex: 'bookName',
        key: 'bookName',
    },
    {
        title: '申请时间',
        dataIndex: 'borrowTime',
        key: 'borrowTime',
    },
    {
        title: '借阅状态',
        dataIndex: 'borrowState',
        key: 'borrowState',
        render: (text, record) => {
            const state = {
                color: record.borrowState == 0 ? "red" : "green",
                status: record.borrowState == 0 ? "待审核" : "审核通过",
            }
            return (
                <div>
                    <Tag color={state.color}>{state.status}</Tag>
                </div>
            )
        }
    },
    
    {
        title: '操作',
        key: 'action',
        render: (text, record) => {
            
            const state ={
                 status : record.borrowState == 0? false : true,
            }
           
            return(
                <div>
                    <Button type="primary" disabled={state.status} onClick={agreeBorrow.bind(this,record.userId,record.bookId,1)}>同意</Button>
                    <Button type="danger" disabled={state.status} onClick={refuseBorrow.bind(this,record)}>拒绝</Button>
                </div>
            )
        },
    },


];
const refuseBorrow= (value) => {
    axios.post('http://localhost:3005/borrow/refuse', {
        bookId: value.bookId,
        userId:value.userId
    }).then((data) => {
        if (data.data.state == 1) {
            axios.post('http://localhost:3005/book/return', {
                bookId: value.bookId
            }).then((data) => {
                if(data.data.state==1){
                    message.success('操作成功"');
                    history.push('/borrow')
                }else{
                    message.error(data.data.message)
                }
            })
        }
        // alert('操作成功')
        // history.push('/borrow')
    })
}
 

class index extends Component {
    state = {
        data: 0,
        history1: this.props.history
    }




    componentDidMount() {
        axios.get('http://localhost:3005/borrow/list').then((data) => {
            //console.log(data.data);
            this.setState({
                data: data.data.data
            });
        })
    }

    
    
      getBorrows = (userId) => {
        //console.log(userId,userName,borrowState)
        axios.get('http://localhost:3005/borrow/list',{
            params:{
                userId:userId,
            }
        }).then((data) => {
            this.setState({
                data: data.data.data
            });
        })
    }

    render() {
        history = this.state.history1;
        
        return (
            <div>
                <div className="search">
                    <Search placeholder="请输入用户ID" onSearch={value => this.getBorrows(value)} enterButton />
                </div>
                <div><Table columns={columns} dataSource={this.state.data} /></div>
            </div>
        )
    }
}


export default index;