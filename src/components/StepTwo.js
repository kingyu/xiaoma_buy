import React from 'react';
import router from 'umi/router';
import { static_domain } from 'utils/config';
import { toMoney } from 'utils/utils';
import Animate from 'rc-animate';
import { Alert, Checkbox, Button } from 'antd';
import UserInfoModal from './UserInfoModal';
import ScanCodeModal from './ScanCodeModal';
import PayDocumentModal from './PayDocumentModal';
import ClauseModal from './ClauseModal';
import './styles.scss';

class SetpTwoComponet extends React.Component {
  state = {
    userinfoVisible: false,
    scancodeVisible: false,
    paydocVisibel: false,
    clauseVisible: false,
    checked: true,
    isError: false,
  };
  onChange = e => {
    this.setState({
      checked: e.target.checked,
    });
  };
  changeClauseVisible = clauseVisible => {
    this.setState({
      clauseVisible,
    });
  };
  changeUserinfoVisible = userinfoVisible => {
    this.setState({
      userinfoVisible,
    });
  };
  changeScancodeVisible = scancodeVisible => {
    this.setState({
      scancodeVisible,
    });
  };
  changePaydocVisible = paydocVisibel => {
    this.setState({
      paydocVisibel,
    });
  };
  submitUserinfo = values => {
    const { onSaveUserinfo } = this.props;
    onSaveUserinfo &&
      onSaveUserinfo(values, () => {
        this.changeUserinfoVisible(false);
      });
  };
  nowAyment = values => {
    const { pageData, onSubmitOrder } = this.props;
    if (pageData.data.userinfo.customer_name == undefined) {
      this.setState({
        isError: '请填写正确的联系方式，以便我们能及时的联系您！',
      });
      return;
    }
    if (this.state.checked == false) {
      this.setState({
        isError: '请阅读订购协议并勾选同意！',
      });
      return;
    }
    if (this.state.isError !== false) {
      this.setState({
        isError: false,
      });
    }
    onSubmitOrder &&
      onSubmitOrder((data) => {
        if(data === true){
          this.changeScancodeVisible(true);
        }else{
          this.setState({
            isError: `抱歉，填写错误：${data.message}`,
          });
        }
      });
  };
  render() {
    const { pageData } = this.props;
    let _data = pageData.data,
      _order = pageData.order,
      productArray = [],
      prdouctPrice = {},
      productNum = 0;
    prdouctPrice = _data.prdouctPrice;
    if (Array.isArray(_data.selectedProduct)) {
      productArray = _data.selectedProduct;
      productNum = productArray.length;
    }
    const { userinfoVisible, scancodeVisible, paydocVisibel,clauseVisible, isError } = this.state;
    return (
      <React.Fragment>
        <section className="section section-choose-product">
          <div className="container">
            <div className="html-content">
              <div className="unit-wrapper">
                <div className="unit-copy-wrapper">
                  <h2 className="xm-typography-headline">这是您的产品</h2>
                  <div className="xm-typography-eyebrow">
                    <ul className="text-list">
                      {productArray.indexOf('shop') > -1 ? (
                        <li>
                          <div className="interval">小马商城</div>
                        </li>
                      ) : null}
                      {productArray.indexOf('pastime') > -1 ? (
                        <li>
                          <div className="interval">休闲娱乐</div>
                        </li>
                      ) : null}
                      {productArray.indexOf('food') > -1 ? (
                        <li>
                          <div className="interval">自助点餐</div>
                        </li>
                      ) : null}
                      {productArray.indexOf('minisite') > -1 ? (
                        <li>
                          <div className="interval">自助建站</div>
                        </li>
                      ) : null}
                    </ul>
                  </div>
                </div>
                <div className="product-wrapper">
                  <div className="product-draw-wrapper">
                    {productArray.indexOf('shop') > -1 ? (
                      <React.Fragment>
                        <figure className="product-draw product-shop-small" />
                      </React.Fragment>
                    ) : null}
                    {productArray.indexOf('pastime') > -1 ? (
                      <React.Fragment>
                        <figure className="product-draw product-pastime-small" />
                      </React.Fragment>
                    ) : null}
                    {productArray.indexOf('food') > -1 ? (
                      <React.Fragment>
                        <figure className="product-draw product-food-small" />
                      </React.Fragment>
                    ) : null}
                    {productArray.indexOf('minisite') > -1 ? (
                      <React.Fragment>
                        <figure className="product-draw product-minisite-small" />
                      </React.Fragment>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section section-payment">
          <div className="container">
            <div className="form-wrapper">
              {_data.selectedTerm === 1 ? (
                <div className="form-item">
                  <span className="headline">全款价格</span>
                  <div className="item-right">
                    <div>
                      <span className="headline">{toMoney(_data.discountPrice)}</span>
                    </div>
                    <div>
                      <span className="gray-text">原价{toMoney(_data.originalPrice)}</span>
                    </div>
                    <a
                      href={`${static_domain}amortize.html`}
                      className="payment-tips"
                      target="_blank"
                    >
                      12月分期付款
                    </a>
                  </div>
                </div>
              ) : null}
              {_data.selectedTerm > 1 ? (
                <div className="form-item">
                  <span className="headline">首付价格</span>
                  <div className="item-right">
                    <div>
                      <span className="headline">{toMoney(_data.downPayment)}</span>
                    </div>
                    <div>
                      <span className="gray-text">全款折扣价{toMoney(_data.discountPrice)}</span>
                    </div>
                    <div>
                      <span className="gray-text">原价{toMoney(_data.originalPrice)}</span>
                    </div>
                    <a
                      href={`${static_domain}amortize.html`}
                      className="payment-tips"
                      target="_blank"
                    >
                      12月分期付款
                    </a>
                  </div>
                </div>
              ) : null}
              <div className="form-item">
                <span className="headline">产品详情</span>
                <div className="item-right">
                  <div>
                    <ul className="text-list">
                      {productArray.indexOf('shop') > -1 ? (
                        <li>
                          <span className="interval">小马商城</span>
                          <span className="gray-text">{toMoney(_data.prdouctPrice.shop)}</span>
                        </li>
                      ) : null}
                      {productArray.indexOf('pastime') > -1 ? (
                        <li>
                          <span className="interval">休闲娱乐</span>
                          <span className="gray-text">{toMoney(_data.prdouctPrice.pastime)}</span>
                        </li>
                      ) : null}
                      {productArray.indexOf('food') > -1 ? (
                        <li>
                          <span className="interval">自助点餐</span>
                          <span className="gray-text">{toMoney(_data.prdouctPrice.food)}</span>
                        </li>
                      ) : null}
                      {productArray.indexOf('minisite') > -1 ? (
                        <li>
                          <span className="interval">自助建站</span>
                          <span className="gray-text">{toMoney(_data.prdouctPrice.minisite)}</span>
                        </li>
                      ) : null}
                    </ul>
                    <span className="gray-text">×</span>
                    <br />
                    <span className="headline">{_data.discount}</span>
                  </div>
                </div>
              </div>
              {_data.selectedTerm !== 1 ? (
                <div className="form-item">
                  <span className="headline">分期详情</span>
                  <div className="item-right">
                    <div>
                      <span className="interval">本金</span>
                      <span className="gray-text">
                        {toMoney(_data[`termPayment${_data.selectedTerm}`])}
                      </span>
                      <span className="gray-text plus">+</span>
                      <span className="interval">每月利息</span>
                      <span className="gray-text">
                        {toMoney(_data[`termInterest${_data.selectedTerm}`])}
                      </span>
                      <br />
                      <span className="gray-text">×</span>
                      <br />
                      <span className="headline">{_data.selectedTerm}</span>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="form-item">
                <span className="headline">用户信息</span>
                <div className="item-right">
                  {_data.userinfo.customer_name ? (
                    <ul className="text-list no-plus">
                      <li>
                        <span className="label">姓名：</span>
                        <span className="gray-text">{_data.userinfo.customer_name}</span>
                      </li>
                      <li>
                        <span className="label">电话：</span>
                        <span className="gray-text">{_data.userinfo.customer_mobile}</span>
                      </li>
                      <li>
                        <span className="label">邮箱：</span>
                        <span className="gray-text">{_data.userinfo.customer_email}</span>
                      </li>
                    </ul>
                  ) : (
                    <div>
                      <span className="gray-text">
                        请填写正确的联系方式
                        <br />
                        以便我们能及时的联系您
                      </span>
                    </div>
                  )}
                  <a
                    onClick={() => {
                      this.changeUserinfoVisible(true);
                    }}
                  >
                    填写
                  </a>
                </div>
              </div>
              <div className="form-item">
                <Checkbox checked={this.state.checked} onChange={this.onChange}>
                  我已阅读并同意 
                </Checkbox>
                <a onClick={() => { this.changeClauseVisible(true);}}>《小马飞腾订购及服务协议》</a>
                <div className="item-right">
                  <button
                    className="xm-button"
                    onClick={() => {
                      this.nowAyment();
                    }}
                  >
                    立即付款
                  </button>
                </div>
              </div>
            </div>
            {isError !== false ? (
              <div className="form-item">
                <div className="product-price">
                  <Alert message={isError} type="error" showIcon />
                </div>
              </div>
            ) : null}
            <div className="service">
              <Button type="primary" icon="message" ghost onClick={()=>{if(document.getElementById('nb_invite_ok')){document.getElementById('nb_invite_ok').click()}}}>
                联系客服
              </Button>
            </div>
            <p className="helps">获得购买帮助，或致电400-653-6993</p>
          </div>
        </section>
        <UserInfoModal
          data={_data.userinfo}
          visible={userinfoVisible}
          onClose={() => {
            this.changeUserinfoVisible(false);
          }}
          onSubmit={this.submitUserinfo}
        />
        <ClauseModal
          visible={clauseVisible}
          onClose={() => {
            this.changeClauseVisible(false);
          }}
        />
        {scancodeVisible ? (
          <ScanCodeModal
            data={_data}
            order={_order}
            visible={scancodeVisible}
            queryOrder={this.props.queryOrder}
            onClose={() => {
              this.changeScancodeVisible(false);
            }}
            onSubmit={() => {
              this.changeScancodeVisible(false);
              this.changePaydocVisible(true);
            }}
          />
        ) : null}
        <PayDocumentModal
          data={_data}
          visible={paydocVisibel}
          onClose={() => {
            this.changePaydocVisible(false);
          }}
          onSubmit={values => {
            this.props.onSubmitOrderOfflinepay(values, isOK => {
              if (isOK == true) {
                this.changePaydocVisible(false);
                router.push('/paycomplete.html');
              }
            });
          }}
        />
      </React.Fragment>
    );
  }
}
export default SetpTwoComponet;
