import React from 'react';
import router from 'umi/router';
import { toMoney } from 'utils/utils';
import { Modal, Form, Radio, Input, Button, Checkbox } from 'antd';
import ScanCodeTip from '../assets/scan_code_tip.png';
const RadioGroup = Radio.Group;


class ScanCodeModal extends React.Component {
  state = {
    payType: 1,
  };
  componentDidMount(nextProps) {
    this.startPoll();
  }
  componentWillUnmount() {
    clearInterval(this.timeout);
  }
  startPoll() {
    this.timeout = setInterval(() => {
      this.props.queryOrder(data => {
        if (data === true) {
          router.push('/paycomplete.html');
        }
      });
    }, 3000);
  }
  changePayType = e => {
    if (e.target.value == 1) {
      this.startPoll();
    } else {
      clearInterval(this.timeout);
    }
    this.setState({
      payType: e.target.value,
    });
  };
  handleSubmit = e => {
    const { onSubmit } = this.props;
    e.preventDefault();
    onSubmit && onSubmit();
  };
  render() {
    const { visible, onClose, onSubmit, data, order } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
    const { payType } = this.state;
    return (
      <Modal
        className="scan-code-modal"
        title="选择付款方式"
        width={530}
        visible={visible}
        centered
        footer={null}
        onCancel={onClose}
      >
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item {...formItemLayout} label="支付号码:">
            <span className="ant-form-text">{data.userinfo.customer_mobile}</span>
          </Form.Item>
          <Form.Item {...formItemLayout} label="支付金额:">
            <span className="ant-form-text">
              {data.selectedTerm === 1 ? (
                <span><span style={{color:'#FF6A44',fontSize: '18px'}}>{toMoney(data.discountPrice, '')}</span>元</span>
              ) : (
                <span><span style={{color:'#FF6A44',fontSize: '18px'}}>{toMoney(data.downPayment, '')}</span>元</span>
              )}
            </span>
          </Form.Item>
          <Form.Item {...formItemLayout} label="支付号码:">
            <RadioGroup onChange={this.changePayType} value={payType}>
              <Radio value={1}>扫码支付</Radio>
              <Radio value={2}>汇款支付</Radio>
            </RadioGroup>
          </Form.Item>
          {payType == 1 ? (
            <React.Fragment>
              <h5 className="pay-tip">支付完成后将有客服联系您，请保持手机的畅通。</h5>
              <div className="pay-code">
                <img className="code" src={order.paycode} alt="支付二维码" />
                <br />
                <img src={ScanCodeTip} alt="" />
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="remittance">
                <p style={{ fontSize: 14,marginBottom:20,fontWeight: 500,letterSpacing:1 }}>
                  您需汇款
                  {data.selectedTerm === 1 ? (
                    <span><span style={{color:'#FF6A44',fontSize: '18px'}}>{toMoney(data.discountPrice, '')}</span>元</span>
                  ) : (
                    <span><span style={{color:'#FF6A44',fontSize: '18px'}}>{toMoney(data.downPayment, '')}</span>元</span>
                  )}
                  至以下账户，汇款成功后上传凭证信息，审核通过后到账
                </p>
                <p>1. 招商银行 (企业对公账号)</p>
                <p>账号：7919 0710 1710 202</p>
                <p>支行: 招商银行南昌分行青山湖支行</p>
                <p style={{marginBottom:20}}>户名：南昌小马飞腾信息技术有限公司 </p>
                <p>2. 建设银行汇款(法人账号)</p>
                <p>账号：6217 0020 2002 8552 933</p>
                <p>支行：南航分理处</p>
                <p style={{marginBottom:20}}>户名：张奇奇</p>
              </div>
              <Form.Item style={{ textAlign: 'right', marginTop: 40, marginRight: 26 }}>
                <Button type="primary" htmlType="submit" className="xm-button">
                  已转账汇款，我要填写付款信息
                </Button>
              </Form.Item>
            </React.Fragment>
          )}
        </Form>
      </Modal>
    );
  }
}
const WrappedScanCodeModal = Form.create()(ScanCodeModal);
export default WrappedScanCodeModal;
