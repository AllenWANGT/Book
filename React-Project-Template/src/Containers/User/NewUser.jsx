import React, { Component } from 'react'
import {Form,Input,Tooltip,Icon,Cascader, Select,Row,Col,Checkbox,Button,AutoComplete,message} from 'antd';
import { Radio } from 'antd';
const axios = require('axios');
let sex = 0;
const changeSex = (sex1) => {
  sex = sex1;
}

class App extends React.Component {
  state = {
    value: 1,
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const sex2 = this.state.value;
    changeSex(sex2);
    return (
      <Radio.Group onChange={this.onChange} value={this.state.value}>
        <Radio value={1}>男</Radio>
        <Radio value={2}>女</Radio>
      </Radio.Group>
    );
  }
}

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;



class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {    
        //console.log('Received values of form: ', values);
        axios.post('http://localhost:3005/user/addUser',values).then((data) => {
          message.success('添加用户成功');
          this.props.history.push('/user');
      })

      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码不一致!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 26 },
        sm: { span: 9 },
      },
      wrapperCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="账号">
          {getFieldDecorator('id', {
            rules: [
              {
                required: true,
                message: '请输入账号！',
              },
            ],
          })(<Input ></Input>)}
        </Form.Item>
        <Form.Item label="密码" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="确认密码" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: '请确认密码!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item label="性别">
          {getFieldDecorator('sex')(
            <Radio.Group>
              <Radio value="男">男</Radio>
              <Radio value="女">女</Radio>
            </Radio.Group>,
          )}
        </Form.Item>
        <Form.Item label="姓名">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入姓名!',
              },
            ],
          })(<Input ></Input>)}
        </Form.Item>
        <Form.Item label="年龄">
          {getFieldDecorator('age', {
            rules: [
              {
                required: true,
                message: '请输入年龄!',
              },
            ],
          })(<Input ></Input>)}
        </Form.Item>
        <Form.Item label="地址">
          {getFieldDecorator('address', {
            rules: [
              {
                required: true,
                message: '请输入地址!',
              },
            ],
          })(<Input ></Input>)}
        </Form.Item>
        <Form.Item label="手机号">
          {getFieldDecorator('phone', {
            rules: [
              {
                required: true,
                message: '请输入手机号!',
              },
            ],
          })(<Input ></Input>)}
        </Form.Item>
       
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            提交
            </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

class Index extends Component {
  render() {
    return (
      <div>
        <div><WrappedRegistrationForm history={this.props.history}></WrappedRegistrationForm></div>
      </div>
    )
  }
}

export default Index;