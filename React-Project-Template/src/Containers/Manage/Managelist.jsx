import React, { Component } from 'react'
import { } from 'antd';
import { Table,Drawer,Row,Col,Select, Divider, Tag, Button, Input,Form,Label ,message} from 'antd';
//import Style from './index.css'


const axios = require('axios');
let history=0;
const { Search } = Input;
const deleteAdmin = (userId) =>{
    axios.get('http://localhost:3005/user/delete', {
        params: {
            userId: userId
        }
    }).then((data) => {
        
        message.success(data.data.message)
        history.push('/admins')
        //location.reload()
    })
}

class DrawerForm extends React.Component {
    state = {
        visible: false,
        admin: this.props.admin,
        submit: "提交",
        bookstate: "未借"
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
       
    }


    showDrawer = () => {
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //       console.log('Received values of form: ', values);
        //     }
        //   });
        this.setState({
            visible: true,
            submit: "确认"
        });
    };

    onSubmit=()=>{
        this.setState({
            visible: false,
            submit: "提交"
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
                <Button type="primary" onClick={this.showDrawer}>详情</Button>
                <Button type="danger" onClick={deleteAdmin.bind(this, this.state.admin.id)}>删除</Button>
                <Drawer
                    title="管理员信息"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="管理员id">
                                    {getFieldDecorator('bookId', {
                                        initialValue: this.state.admin.id,
                                        rules: [{ required: true, message: '请输入图书id' }],
                                    })(<Input placeholder="请输入图书id" disabled={true} ></Input>)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="姓名">
                                    {getFieldDecorator('bookName', {
                                        initialValue: this.state.admin.name,
                                        rules: [{ required: true, message: '请输入书面' }],
                                    })(<Input placeholder="请输入书名" disabled={true}/>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="年龄">
                                    {getFieldDecorator('bookIsbn', {
                                        initialValue: this.state.admin.age,
                                        rules: [{ required: true, message: '请输入图书ISBN' }],
                                    })(<Input placeholder="请输入图书ISBN" disabled={true}/>)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="性别">
                                    {getFieldDecorator('bookAuthor', {
                                       initialValue: this.state.admin.sex,
                                        rules: [{ required: true, message: '请输入图书作者' }],
                                    })(<Input placeholder="请输入图书作者" disabled={true}/>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="地址">
                                    {getFieldDecorator('bookPublisher', {
                                        initialValue: this.state.admin.address,
                                        rules: [{ required: true, message: '请输入图书出版社' }],
                                    })(<Input placeholder="请输入图书出版社"disabled={true} />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="电话">
                                    {getFieldDecorator('bookStatus', {
                                        initialValue: this.state.admin.phone,
                                        // rules: [{ required: true, bookStatusmessage: '!!!' }],
                                    })(<Input placeholder="." disabled={true}/>)}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="登陆密码">
                                    {getFieldDecorator('dateTime', {
                                        initialValue: this.state.admin.password,
                                        rules: [{ required: true, message: 'Please choose the dateTime' }],
                                    })(<Input  disabled={true}/>

                                    )}
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
                        <Button onClick={this.onSubmit} type="primary">确认 </Button>
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>取消</Button>

                    </div>
                </Drawer>
            </div>
        );
    }
}

const App = Form.create()(DrawerForm);
const columns = [
    {
        title: '用户ID',
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
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <div>
                <App admin={record}/>
            </div>
        ),
    },

]
class Index extends Component {
    state = {
        data: 0
    }
    componentDidMount() {
        axios.get('http://localhost:3005/user/getAdmin').then((data) => {
            //console.log(data.data);
            this.setState({
                data: data.data.data
            });
        })
    }

    getAdmins = (userId) => {
        //console.log(value);
        axios.get('http://localhost:3005/user/getAdmin', {
            params: {
                userId: userId,
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
                <div className="search"><Search placeholder="请输入管理员id" onSearch={value =>this.getAdmins(value)} enterButton /></div>
                <div><Table columns={columns} dataSource={this.state.data} /></div>
            </div >
        )
    }
}

export default Index;