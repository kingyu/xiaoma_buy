import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import Animate from 'rc-animate';
import Link from 'umi/link';
import './index.scss';
import Carousel from '../components/Carousel';
import StepOne from '../components/StepOne';
import StepTwo from '../components/StepTwo';

class HomePage extends React.Component {
  componentDidMount() {
    this.webUrl = encodeURIComponent(window.location.href);
  }
  onJumpStep = payload => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/jumpStep',
      payload,
    }).then((isOK)=>{
      if(isOK)
        router.push('/order.html');
    })
  };
  onSelectedProduct = key => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/selectedProduct',
      payload: key,
    });
  };
  onConfirmProduct = callback => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/confirmProduct',
    }).then(() => {
      callback && callback();
    });
  };
  render() {
    const { data } = this.props.pageData;
    return (
      <div>
        <Animate component="" transitionName="fade">
            <StepOne
              key="one"
              {...this.props}
              onJumpStep={this.onJumpStep}
              onSelectedProduct={this.onSelectedProduct}
              onConfirmProduct={this.onConfirmProduct}
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
})(HomePage);
