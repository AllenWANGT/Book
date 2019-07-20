import React, { Component } from 'react';
import { } from 'antd';
import { Table, Tag,message, Button, Input, Form } from 'antd';
import { Drawer, Col, Row, Select, DatePicker } from 'antd';


//import Mybutton from './MyDrawer.jsx';
const axios = require('axios');

const { Search } = Input;

const deleteBook = (bookId) => {
    axios.get('http://localhost:3005/book/delete', {
        params: {
            bookId: bookId
        }
    }).then(() => {
        history.push('/')
        message.info('删除成功')
        //location.reload()
    })
};
let history = 0;



const { Option } = Select;
class DrawerForm extends React.Component {
    state = {
        visible: false,
        book: this.props.book,
        submit: "提交",
        show: true
    };
    // handleSubmit = e => {
    //     e.preventDefault();
    //     this.props.form.validateFieldsAndScroll((err, values) => {
    //       if (!err) {
    //         console.log('Received values of form: ', values);
    //         axios.post('http://localhost:3005/book/updateBook',values).then(() => {
    //         //console.log(0);
    //         alert('提交成功');
    //         this.props.history.push('/admin')
    //     }).catch(() => {
    //       //console.log(1);
    //       alert('提交失败');
    //     })
    //       }
    //     });
    //   };
    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };


    cancel = () => {
        axios.get('http://localhost:3000/book').then((data) => {
            
        })
    }


    showDrawer = () => {
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //       console.log('Received values of form: ', values);
        //     }
        //   });
        this.setState({
            visible: true,
            show: false,
        });
    };

    
    showDrawer2 = () => {
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //       console.log('Received values of form: ', values);
        //     }
        //   });
        this.setState({
            visible: true,
            show: true,
        });
    };

    onSubmit=()=>{
         this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
              axios.post('http://localhost:3005/book/updateBook',values).then(() => {
                    history.push('/')
              })
              this.setState({
                visible: false,
                submit: "提交"
            });
            }
          });
    }

    onClose = () => {
        this.setState({
            visible: false,
            submit: "提交"
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Button type="primary" onClick={this.showDrawer}>编辑</Button>
                <Button type="dashed" onClick={this.showDrawer2}>详情</Button>
                <Button type="danger" onClick={deleteBook.bind(this, this.props.bookId)}>删除</Button>
                <Drawer
                    title="图书详情"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="图书id">
                                    {getFieldDecorator('bookId', {
                                        initialValue: this.state.book.bookId,
                                        rules: [{ required: true, message: '请输入图书id' }],
                                    })(<Input placeholder="请输入图书id" disabled={true} ></Input>)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="书名">
                                    {getFieldDecorator('bookName', {
                                        initialValue: this.state.book.bookName,
                                        rules: [{ required: true, message: '请输入书面' }],
                                    })(<Input placeholder="请输入书名" disabled={this.state.show}/>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="ISBN">
                                    {getFieldDecorator('bookIsbn', {
                                        initialValue: this.state.book.bookIsbn,
                                        rules: [{ required: true, message: '请输入图书ISBN' }],
                                    })(<Input placeholder="请输入图书ISBN" disabled={this.state.show}/>)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="作者">
                                    {getFieldDecorator('bookAuthor', {
                                        initialValue: this.state.book.bookAuthor,
                                        rules: [{ required: true, message: '请输入图书作者' }],
                                    })(<Input placeholder="请输入图书作者" disabled={this.state.show}/>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="出版社">
                                    {getFieldDecorator('bookPublisher', {
                                        initialValue: this.state.book.bookPublisher,
                                        rules: [{ required: true, message: '请输入图书出版社' }],
                                    })(<Input placeholder="请输入图书出版社" disabled={this.state.show}/>)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="入库日期">
                                    {getFieldDecorator('dateTime', {
                                        initialValue: this.state.book.bookCreateTime,
                                        rules: [{ required: true, message: 'Please choose the dateTime' }],
                                    })(<Input  disabled={true}/>

                                    )}
                                </Form.Item>
                            </Col>
                        </Row>   
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item label="图书概要">
                                    {getFieldDecorator('bookInfo', {
                                        initialValue: this.state.book.bookInfo,
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入说明',
                                            },
                                        ],
                                    })(<Input.TextArea rows={4} placeholder="请输入图书说明" disabled={this.state.show}/>)}
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
                        <Button onClick={this.onSubmit} type="primary" disabled={this.state.show}>{this.state.submit} </Button>
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
        render: (text, record) => (
            <div>
                <App bookId={record.bookId} book={record} />
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
                data: data.data.data,
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
         history = this.props.history;
        console.log(this.state.data);
        return (
            <div >
                <div className="search">
                    <Search placeholder="请输入图书名称" onSearch={value => this.getBooks(value)} enterButton />
                </div>
                <div><Table columns={columns} dataSource={this.state.data} /></div>
            </div>
        )
    }
}
export default index;