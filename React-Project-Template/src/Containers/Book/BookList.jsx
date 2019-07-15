import React, { Component } from 'react';
import { } from 'antd';
import { Table, Divider, Tag, Button, Input, Form } from 'antd';
import { Drawer, Col, Row, Select, DatePicker, Icon } from 'antd';
import Style from './index.css';
//import Mybutton from './MyDrawer.jsx';
const axios = require('axios');

const { Search } = Input;

const deleteBook = (bookId) => {
    axios.get('http://localhost:3005/book/delete', {
        params: {
            bookId: bookId
        }
    }).then(() => {
        //this.props.history.push('/book')
        alert("删除成功")
    }).catch(() => {
        alert('删除失败')
    })
};



const { Option } = Select;
class DrawerForm extends React.Component {
    state = { visible: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Button type="primary" onClick={this.showDrawer}>编辑</Button>
                <Button type="dashed" onClick={this.showDrawer}>详情</Button>
                <Button type="danger" onClick={deleteBook.bind(this,this.props.bookId)}>删除</Button>
                <Drawer
                    title="编辑"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="图书id">
                                    {getFieldDecorator('bookId', {
                                        rules: [{ required: true, message: 'Please enter user name' }],
                                    })(<Input placeholder="请输入图书id" />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="书名">
                                    {getFieldDecorator('bookName', {
                                        rules: [{ required: true, message: 'Please enter user name' }],
                                    })(<Input placeholder="请输入书名" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="ISBN">
                                    {getFieldDecorator('bookIsbn', {
                                        rules: [{ required: true, message: 'Please enter user name' }],
                                    })(<Input placeholder="请输入图书ISBN" />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="作者">
                                    {getFieldDecorator('bookAuthor', {
                                        rules: [{ required: true, message: 'Please enter user name' }],
                                    })(<Input placeholder="请输入图书作者" />)}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="状态">
                                    {getFieldDecorator('bookStatus', {
                                        rules: [{ required: true, message: 'Please enter user name' }],
                                    })(<Input placeholder="请输入图书状态" />)}
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item label="日期">
                                    {getFieldDecorator('dateTime', {
                                        rules: [{ required: true, message: 'Please choose the dateTime' }],
                                    })(
                                        <DatePicker.RangePicker
                                            style={{ width: '100%' }}
                                            getPopupContainer={trigger => trigger.parentNode}
                                        />,
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="说明">
                                    {getFieldDecorator('description', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入说明',
                                            },
                                        ],
                                    })(<Input.TextArea rows={4} placeholder="请输入图书说明" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.onClose} type="primary">提交 </Button>
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>取消</Button>

                    </div>
                </Drawer>
            </div>
        );
    }
}

const App = Form.create()(DrawerForm);

//ReactDOM.render(<App/>, mountNode);

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
        render: (text, record) => (
            <div>
                <App bookId={record.bookId}/>

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
            // console.log(data.data);
            this.setState({
                data: data.data
            });
        })
    }

    getBooks = (value) => {
        //console.log(value);
        axios.get('http://localhost:3005/book/list', {
            params: {
                bookName: value,
            }
        }).then((data) => {
            //console.log(data.data);
            this.setState({
                data: data.data
            });
        })
    }


    render() {
        return (
            <div>
                <div className="search">
                    <Search placeholder="请输入图书名称" onSearch={value => this.getBooks(value)} enterButton />
                </div>
                <div><Table columns={columns} dataSource={this.state.data} /></div>
            </div>
        )
    }
}


export default index;