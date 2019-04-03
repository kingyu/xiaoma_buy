import React from 'react';
import { toMoney } from 'utils/utils';
import { Modal, Form, Radio, Input, Button, Checkbox, DatePicker, Divider } from 'antd';
const RadioGroup = Radio.Group;

class PayDocumentModal extends React.Component {
  state = {};
  handleSubmit = e => {
    const { onSubmit } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.remit_time = values.remit_time.format('YYYY-MM-DD');
        onSubmit && onSubmit(values);
      }
    });
  };
  render() {
    const { visible, onClose, onSubmit, data } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 10 },
    };
    return (
      <Modal
        className="pay-doc-modal"
        title="线下汇款凭证"
        visible={visible}
        centered
        footer={null}
        onCancel={onClose}
      >
        <Form onSubmit={this.handleSubmit} className="pay-doc-form">
          <Divider orientation="left">收款方信息</Divider>
          <div className="remittance">
            <p>户名：南昌小马飞腾信息技术有限公司</p>
            <p>收款方开户行：招商银行南昌分行青山湖支行</p>
            <p>收款方账户： 7919 0710 1710 202</p>
          </div>
          <Divider orientation="left">付款方信息</Divider>
          <Form.Item {...formItemLayout} label="付款户名:">
            {getFieldDecorator('remitter', {
              rules: [{ required: true, message: '请输入户名!' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="付款账号:">
            {getFieldDecorator('account', {
              rules: [{ required: true, message: '请输入付款账号!' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="金额:">
            <span className="ant-form-text">
              {data.selectedTerm === 1 ? (
                <span>{toMoney(data.discountPrice, '')}元</span>
              ) : (
                <span>{toMoney(data.downPayment, '')}元</span>
              )}
            </span>
          </Form.Item>
          <Form.Item {...formItemLayout} label="付款时间:">
            {getFieldDecorator('remit_time', {
              rules: [{ required: true, message: '请选择日期!' }],
            })(<DatePicker locale="zh_CN" placeholder="请选择日期" style={{ width: '100%' }} />)}
          </Form.Item>
          <Form.Item style={{ textAlign: 'right', marginTop: 40, marginRight: 10 }}>
            <Button type="primary" htmlType="submit" className="xm-button">
              确认提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
const WrappedPayDocumentModal = Form.create()(PayDocumentModal);
export default WrappedPayDocumentModal;
