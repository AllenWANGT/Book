import React, { Component } from 'react'
import {
  Form,
  Input,
  Select,
  Button,
  AutoComplete,
} from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const axios = require('axios');


class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };


  cancel = () => {
    axios.get('http://localhost:3000/book').then((data) => {

    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
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
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="书名">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'name',
                message: '书名不能为空！',
              },
              {
                required: true,
                message: '书名不能为空！',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="作者">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="ISDN">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="状态">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'state',
                message: 'state',
              },
              {
                required: true,
                message: 'Please input your state',
              },
            ],
          })(<Input />)}
        </Form.Item>




        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">提交</Button>
          <Button htmlType="cancel" onClick={this.cancel}>取消 </Button>
          </Form.Item>
        </Form >
      );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

class Index extends Component {
  render() {
    return (
      <div>
        <div><WrappedRegistrationForm></WrappedRegistrationForm></div>
      </div>
    )
  }
}

export default Index;