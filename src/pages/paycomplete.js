import React from 'react';
import { connect } from 'dva';
import Animate from 'rc-animate';
import './paycomplete.scss';
import buySucceedIcon from '../assets/buy_succeed_icon.png';
class PaycompletePage extends React.Component {
  componentDidMount() {}
  render() {
    const { data } = this.props.pageData;
    return (
      <section class="section section-pay">
        <div class="container">
          <img src={buySucceedIcon} alt="succeed" />
          <h1>支付成功</h1>
          <p>支付完成后将有客服联系您，请保持手机的畅通。</p>
        </div>
      </section>
    );
  }
}
export default connect(state => {
  return {
    pageData: state.global,
  };
})(PaycompletePage);
