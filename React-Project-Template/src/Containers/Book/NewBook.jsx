import React, { Component } from 'react'
import {
  Form,
  Input,
  Select,
  Button,
  AutoComplete,
  message
} from 'antd';
const { TextArea } = Input;
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
        //console.log('Received values of form: ', values);
        
        axios.post('http://localhost:3005/book/addBook',values).then(() => {
        //console.log(0);
        message.success('插入成功');
        this.props.history.push('/')
    }).catch(() => {
      //console.log(1);
      message.info('插入失败');
    })
      }
    });
  };
  // getBooks = (value) => {
  //   //console.log(value);
  //   axios.get('http://localhost:3005/book/new', {
  //     params: {
  //       book_author: value.book_author,
  //       book_isbn: value.book_isbn,
  //       book_name: value.book_name,
  //       book_status: value.book_status,
  //     }
  //   }).then((data) => {
  //     //console.log(data.data);
  //     this.setState({
  //       data: data.data
  //     });
  //   })
  // };

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
   

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="书名">
          {getFieldDecorator('bookName', {
            rules: [
              {
                required: true,
                message: '书名不能为空！',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="作者">
          {getFieldDecorator('bookAuthor', {
            rules: [

              {
                required: true,
                message: '作者不能为空！',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="ISBN">
          {getFieldDecorator('bookIsbn', {
            rules: [

              {
                required: true,
                message: 'ISBN不能为空！',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="出版社">
          {getFieldDecorator('bookPublisher', {
            rules: [

              {
                required: true,
                message: '出版社不能为空！',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="图书概要">
          {getFieldDecorator('bookInfo', {
            rules: [

              {
                required: true,
                message: '图书概要不能为空！',
              },
            ],
          })(<Input.TextArea rows={4} />)}
        </Form.Item>
        

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" >提交</Button>
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
        <div><WrappedRegistrationForm history={this.props.history}></WrappedRegistrationForm></div>
      </div>
    )
  }
}

export default Index;