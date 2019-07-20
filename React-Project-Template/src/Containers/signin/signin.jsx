import React, { Component } from 'react'
import { Form, Icon, Input, Button,message, Checkbox } from 'antd';
const axios = require('axios');
import signin from "./signin.css";



class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);
                axios.defaults.withCredentials = true;
                axios.post('http://localhost:3005/user/login', {
                    userId: values.userId,
                    userPassword: values.userPassword
                }).then((data) => {
                    //console.log(data.data);
                    //console.log(data.data.userRole);
                    if (data.data.state == 1) {
                        if (data.data.data.userRole == 1) {
                            this.props.history.push({
                                pathname: "/admin", state: {
                                    show1: 'none',
                                    show2: 'menu',
                                    show3: 'none',
                                }
                            });
                        } else if (data.data.data.userRole == 2) {
                            this.props.history.push({
                                pathname: "/admin", state: {
                                    show1: 'menu',
                                    show2: 'none',
                                    show3: 'none'
                                }
                            });
                        } else {
                            this.props.history.push({
                                pathname: "/admin", state: {
                                    show1: 'none',
                                    show2: 'none',
                                    show3: 'menu'
                                }
                            });
                        }

                    } else {
                        message.info('登录失败');
                    }
                })
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('userId', {
                        rules: [{ required: true, message: '请输入您的用户名!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="账号"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('userPassword', {
                        rules: [{ required: true, message: '请输入您的密码!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>记住密码</Checkbox>)}
                    <a className="login-form-forgot" href="">
                        忘记密码
            </a>
                    <div><Button type="primary" htmlType="submit" className="login-form-button" >登录</Button></div>
                    <a href="">没有账号，现在就去注册...</a>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
class Index extends Component {

    render() {
        return (
            //style={sectionStyle}
            <div className="Image">
                <div className="inImage">
                    <WrappedNormalLoginForm history={this.props.history}></WrappedNormalLoginForm>
                </div>
            </div>
        )
    }
}

export default Index;