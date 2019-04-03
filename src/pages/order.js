import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import Animate from 'rc-animate';
import Link from 'umi/link';
import './index.scss';
import Carousel from '../components/Carousel';
import StepTwo from '../components/StepTwo';

class OrderPage extends React.Component {
  componentDidMount() {
    const { data } = this.props.pageData;
    if(data.selectedProduct.length == 0){
        router.push('/');
    }
  }
  onQueryOrder = callback => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/queryOrder',
    }).then(data => {
      callback && callback(data);
    });
  };
  onSubmitOrder = callback => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/submitOrder',
    }).then(data => {
      callback && callback(data);
    });
  };
  onSubmitOrderOfflinepay = (values, callback) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/submitOrderOfflinepay',
      payload: values,
    }).then(isOK => {
      callback && callback(isOK);
    });
  };
  onSaveUserinfo = (values, callback) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/saveUserinfo',
      payload: values,
    }).then(() => {
      callback && callback();
    });
  };
  render() {
    const { data } = this.props.pageData;
    return (
      <div>
        <Animate component="" transitionName="fade">
          <StepTwo
            key="two"
            {...this.props}
            queryOrder={this.onQueryOrder}
            onSubmitOrder={this.onSubmitOrder}
            onSubmitOrderOfflinepay={this.onSubmitOrderOfflinepay}
            onSaveUserinfo={this.onSaveUserinfo}
          />
        </Animate>
        <Carousel />
      </div>
    );
  }
}
export default connect(state => {
  return {
    pageData: state.global,
  };
})(OrderPage);
