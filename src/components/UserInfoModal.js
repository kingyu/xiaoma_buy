import React from 'react';
import { Modal, Form, Icon, Input, Button, Checkbox } from 'antd';

class UserInfoModal extends React.Component {
  state = {};
  handleSubmit = e => {
    const { onSubmit } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let _values = {
          familyName: values.familyName,
          name: values.name,
          customer_name: values.familyName + values.name,
          customer_mobile: values.customer_mobile,
          customer_email: values.customer_email,
        };
        onSubmit && onSubmit(_values);
      }
    });
  };
  validFunction = (rule, value, callback) => {
    if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
      callback('手机格式不正确！'); //校验未通过
    }
    callback(); //校验通过
  };
  render() {
    const { visible, onClose, onSubmit, data } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };

    return (
      <Modal
        className="user-form-modal"
        title={null}
        visible={visible}
        centered
        footer={null}
        onCancel={onClose}
      >
        <h3 className="modal-headline">填写您的信息</h3>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item style={{ marginBottom: 0 }}>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 7px)' }}>
              {getFieldDecorator('familyName', {
                initialValue: data.familyName,
                validateFirst:true,
                rules: [
                  { required: true, message: '请输入您的姓氏！' },
                  { max: 2, message: '姓氏不能超过2个' },
                ],
              })(<Input placeholder="姓氏" />)}
            </Form.Item>
            <div style={{ display: 'inline-block', width: '14px', textAlign: 'center' }} />
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 7px)' }}>
              {getFieldDecorator('name', {
                initialValue: data.name,
                validateFirst:true,
                rules: [
                  { required: true, message: '请输入您的名字！' },
                  { max: 2, message: '名字不能超过2个' },
                ],
              })(<Input placeholder="名字" />)}
            </Form.Item>
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('customer_mobile', {
              initialValue: data.customer_mobile,
              validateFirst:true,
              rules: [
                { required: true, message: '请输入电话号码！' },
                {
                  validator: this.validFunction,
                },
              ],
            })(<Input placeholder="电话号码" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('customer_email', {
              initialValue: data.customer_email,
              validateFirst:true,
              rules: [
                { required: true, message: '请输入电子邮箱!' },
                { type: 'email', message: '请输入正确邮箱格式!' },
              ],
            })(<Input placeholder="电子邮箱" />)}
          </Form.Item>
          <Form.Item style={{ textAlign: 'center', marginTop: 40 }}>
            <Button type="primary" htmlType="submit" className="xm-button">
              确认信息
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
const WrappedUserInfoModal = Form.create()(UserInfoModal);
export default WrappedUserInfoModal;
