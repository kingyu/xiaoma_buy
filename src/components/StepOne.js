import React from 'react';
import { toMoney } from 'utils/utils';
import { static_domain } from 'utils/config';
import Animate from 'rc-animate';
import QueueAnim from 'rc-queue-anim';
import { Alert } from 'antd';
import './styles.scss';

class StepOneComponet extends React.Component {
  state = {
    step: 1,
    isError: false,
  };
  jumpSteps = step => {
    const { onConfirmProduct, pageData } = this.props;
    let productArray = pageData.data.selectedProduct,
      productNum = productArray.length;
    if (productNum == 0) {
      this.setState({
        isError: true,
      });
      return;
    }
    if (step == 2) {
      onConfirmProduct &&
        onConfirmProduct(() => {
          this.setState({
            step,
          });
        });
    } else {
      this.setState({
        step,
      });
    }
  };
  onSelectedProduct = key => {
    const { onSelectedProduct } = this.props;
    this.setState({
      isError: false,
    });
    onSelectedProduct && onSelectedProduct(key);
  };
  onSelectedTerm = term => {
    const { onJumpStep } = this.props;
    onJumpStep &&
      onJumpStep({
        selectedTerm: term,
      });
  };
  render() {
    const { pageData } = this.props;
    let productArray = [],
      prdouctPrice = {},
      productNum = 0;
    prdouctPrice = pageData.data.prdouctPrice;
    if (Array.isArray(pageData.data.selectedProduct)) {
      productArray = pageData.data.selectedProduct;
      productNum = productArray.length;
    }
    const { step, isError } = this.state;
    const shop = () => (
      <figure className="icon-content active" key="shop">
        <div className="icon-image icon-shop" />
        <figcaption className="icon-caption">小马商城</figcaption>
      </figure>
    );
    const pastime = () => (
      <figure className="icon-content active" key="pastime">
        <div className="icon-image icon-pastime" />
        <figcaption className="icon-caption">休闲娱乐</figcaption>
      </figure>
    );
    const food = () => (
      <figure className="icon-content active" key="food">
        <div className="icon-image icon-food" />
        <figcaption className="icon-caption">自助点餐</figcaption>
      </figure>
    );
    const minisite = () => (
      <figure className="icon-content active" key="minisite">
        <div className="icon-image icon-minisite" />
        <figcaption className="icon-caption">自助建站</figcaption>
      </figure>
    );
    const confirmProduct = () => (
      <div className="unit-wrapper" key="confirmProduct">
        <div className="unit-copy-wrapper">
          <h2 className="xm-typography-headline">确认产品</h2>
          <h3 className="xm-typography-eyebrow">
            <span className="interval">2个产品9.5折</span>
            <span className="interval">3个产品9折</span>
            <span className="interval">全套尊享8折</span>
            <br />
            全年子账号不限量
          </h3>
        </div>
        <div className="product-wrapper">
          <div className="product-draw-wrapper">
            {productArray.indexOf('shop') > -1 ? (
              <React.Fragment>
                <figure className="product-draw product-shop">
                  <figcaption>{toMoney(prdouctPrice.shop)}</figcaption>
                </figure>
              </React.Fragment>
            ) : null}
            {productArray.indexOf('pastime') > -1 ? (
              <React.Fragment>
                <figure className="product-draw product-pastime">
                  <figcaption>{toMoney(prdouctPrice.pastime)}</figcaption>
                </figure>
              </React.Fragment>
            ) : null}
            {productArray.indexOf('food') > -1 ? (
              <React.Fragment>
                <figure className="product-draw product-food">
                  <figcaption>{toMoney(prdouctPrice.food)}</figcaption>
                </figure>
              </React.Fragment>
            ) : null}
            {productArray.indexOf('minisite') > -1 ? (
              <React.Fragment>
                <figure className="product-draw product-minisite">
                  <figcaption className="tip">4月30日上线</figcaption>
                  <figcaption>{toMoney(prdouctPrice.minisite)}</figcaption>
                </figure>
              </React.Fragment>
            ) : null}
          </div>
          <div className="product-choices-wrapper">
            <h5 className="product-headline">确认组合套餐</h5>
            <p className="product-explain">4大主营产品随意组合</p>
            <div className="icon-group no-active">
              {productArray.map((item, index) => {
                if (item == 'shop') {
                  return shop();
                } else if (item == 'pastime') {
                  return pastime();
                } else if (item == 'food') {
                  return food();
                } else if (item == 'minisite') {
                  return minisite();
                }
                return null;
              })}
            </div>
            <div className="discount-wrapper">
              {pageData.data.discount < 1 ? (
                <button className="discount-tag">{pageData.data.discount * 10}折</button>
              ) : null}
            </div>

            <button id="btn-pay" className="xm-button" onClick={() => this.jumpSteps(3)}>
              付款
            </button>
            <div className="product-price">{toMoney(pageData.data.discountPrice)}/年</div>
          </div>
        </div>
      </div>
    );
    const chooseProduct = () => (
      <div className="unit-wrapper" key="chooseProduct">
        <div className="unit-copy-wrapper">
          <h2 className="xm-typography-headline">
            OEM工厂
            <br />
            让你拥有自己的品牌
          </h2>
          <h3 className="xm-typography-eyebrow">
            <span className="interval">2个产品9.5折</span>
            <span className="interval">3个产品9折</span>
            <span className="interval">全套尊享8折</span>
            <br />
            全年子账号不限量
          </h3>
        </div>
        <div className="product-wrapper">
          <div className="product-draw-wrapper">
            <div>
              <figure
                className={`product-draw product-shop${productArray.indexOf('shop') > -1 ? ' selected-figure' : ''}`}
                onClick={() => this.onSelectedProduct('shop')}
              >
                <figcaption>{toMoney(prdouctPrice.shop)}</figcaption>
              </figure>
            </div>
            <div>
              <figure
                className={`product-draw product-pastime${productArray.indexOf('pastime') > -1 ? ' selected-figure' : ''}`}
                onClick={() => this.onSelectedProduct('pastime')}
              >
                <figcaption>{toMoney(prdouctPrice.pastime)}</figcaption>
              </figure>
            </div>
            <div>
              <figure
                className={`product-draw product-food${productArray.indexOf('food') > -1 ? ' selected-figure' : ''}`}
                onClick={() => this.onSelectedProduct('food')}
              >
                <figcaption>{toMoney(prdouctPrice.food)}</figcaption>
              </figure>
            </div>
            <div>
              <figure
                className={`product-draw product-minisite${productArray.indexOf('minisite') > -1 ? ' selected-figure' : ''}`}
                onClick={() => this.onSelectedProduct('minisite')}
              >
                <figcaption className="tip">4月30日上线</figcaption>
                <figcaption>{toMoney(prdouctPrice.minisite)}</figcaption>
              </figure>
            </div>
          </div>
          <div className="product-choices-wrapper">
            <h5 className="product-headline">点击选择组合套餐</h5>
            <p className="product-explain">4大主营产品随意组合</p>
            <div className="icon-group">
              <figure
                onClick={() => this.onSelectedProduct('shop')}
                className={`icon-content${productArray.indexOf('shop') > -1 ? ' active' : ''}`}
                key="shop"
              >
                <div className="icon-image icon-shop" />
                <figcaption className="icon-caption">小马商城</figcaption>
              </figure>
              <figure
                onClick={() => this.onSelectedProduct('pastime')}
                className={`icon-content${productArray.indexOf('pastime') > -1 ? ' active' : ''}`}
                key="pastime"
              >
                <div className="icon-image icon-pastime" />
                <figcaption className="icon-caption">休闲娱乐</figcaption>
              </figure>
              <figure
                onClick={() => this.onSelectedProduct('food')}
                className={`icon-content${productArray.indexOf('food') > -1 ? ' active' : ''}`}
                key="food"
              >
                <div className="icon-image icon-food" />
                <figcaption className="icon-caption">自助点餐</figcaption>
              </figure>
              <figure
                onClick={() => this.onSelectedProduct('minisite')}
                className={`icon-content${productArray.indexOf('minisite') > -1 ? ' active' : ''}`}
                key="minisite"
              >
                <div className="icon-image icon-minisite" />
                <figcaption className="icon-caption">自助建站</figcaption>
              </figure>
            </div>
            <div className="discount-wrapper">
              <button className={`discount-tag ${productNum != 2 ? 'disabled' : ''}`}>9.5折</button>
              <button className={`discount-tag ${productNum != 3 ? 'disabled' : ''}`}>9折</button>
              <button className={`discount-tag ${productNum != 4 ? 'disabled' : ''}`}>8折</button>
            </div>
            <button className="xm-button" onClick={() => this.jumpSteps(2)}>
              继续
            </button>
            <Animate component="" transitionName="fade">
              {isError == true ? (
                <div className="product-price">
                  <Alert message="请选择产品！" type="error" showIcon />
                </div>
              ) : null}
            </Animate>
          </div>
        </div>
      </div>
    );
    const payment = () => (
      <div className="unit-wrapper" key="payment">
        <div className="unit-copy-wrapper">
          <h2 className="xm-typography-headline">请选择付款方式</h2>
        </div>
        <div className="product-payment">
          <div className="product-payment-inner">
            <div className="payment-unit">
              <div
                className="payment-box"
                onClick={() => {
                  this.onSelectedTerm(3);
                }}
              >
                <label className="form-label">
                  <span className="as-dimension-capacity-text">3期</span>
                  <span className="as-dimension-pricebox form-label-small">
                    <span className="price-point price-point-financing-short">
                      <span className="as-price-installments">
                        <a className="as-price-installments-items">
                          首付50%，其余分3个月还
                          <span className="nowrap">首付{toMoney(pageData.data.downPayment)}</span>
                        </a>
                      </span>
                    </span>
                    <span className="price-point price-point-fullPrice-short">
                      <span className="nowrap">
                        {toMoney(pageData.data.termPayment3 + pageData.data.termInterest3)}
                      </span>
                    </span>
                  </span>
                </label>
              </div>
              <a href={`${static_domain}amortize.html`} className="payment-tips" target="_blank">
                分期付款详情
              </a>
            </div>
            <div className="payment-unit">
              <div
                className="payment-box"
                onClick={() => {
                  this.onSelectedTerm(6);
                }}
              >
                <label className="form-label">
                  <span className="as-dimension-capacity-text">6期</span>
                  <span className="as-dimension-pricebox form-label-small">
                    <span className="price-point price-point-financing-short">
                      <span className="as-price-installments">
                        <a className="as-price-installments-items">
                          首付50%，其余分6个月还
                          <span className="nowrap">首付{toMoney(pageData.data.downPayment)}</span>
                        </a>
                      </span>
                    </span>
                    <span className="price-point price-point-fullPrice-short">
                      <span className="nowrap">
                        {toMoney(pageData.data.termPayment6 + pageData.data.termInterest6)}
                      </span>
                    </span>
                  </span>
                </label>
              </div>
              <a href={`${static_domain}amortize.html`} className="payment-tips" target="_blank">
                分期付款详情
              </a>
            </div>
            <div className="payment-unit">
              <div
                className="payment-box"
                onClick={() => {
                  this.onSelectedTerm(12);
                }}
              >
                <label className="form-label">
                  <span className="as-dimension-capacity-text">12期</span>
                  <span className="as-dimension-pricebox form-label-small">
                    <span className="price-point price-point-financing-short">
                      <span className="as-price-installments">
                        <a className="as-price-installments-items">
                          首付50%，其余分12个月还
                          <span className="nowrap">首付{toMoney(pageData.data.downPayment)}</span>
                        </a>
                      </span>
                    </span>
                    <span className="price-point price-point-fullPrice-short">
                      <span className="nowrap">
                        {toMoney(pageData.data.termPayment12 + pageData.data.termInterest12)}
                      </span>
                    </span>
                  </span>
                </label>
              </div>
              <a href={`${static_domain}amortize.html`} className="payment-tips" target="_blank">
                分期付款详情
              </a>
            </div>
            <div className="payment-unit">
              <div
                className="payment-box"
                onClick={() => {
                  this.onSelectedTerm(1);
                }}
              >
                <label className="form-label">
                  <span className="as-dimension-capacity-text">全款</span>
                  <span className="as-dimension-pricebox price-all">
                    <span className="nowrap">{toMoney(pageData.data.discountPrice)}</span>
                  </span>
                  <span className="price-initial">原价{toMoney(pageData.data.originalPrice)}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    const getStep = step => {
      switch (step) {
        case 1:
          return chooseProduct();
        case 2:
          return confirmProduct();
        case 3:
          return payment();
        default:
          return null;
      }
    };
    return (
      <section className="section section-step-one">
        <div className="container">
          <Animate component="" transitionName="fade">
            {getStep(step)}
          </Animate>
          <div>
            <nav className="tabnav">
              <ul className="tabnav-items" id="tabnav-tab-controls">
                <li className="tabnav-item">
                  <a onClick={() => {if(step != 1)this.jumpSteps(1)}} className={`tablist-link`}>
                    选择产品
                  </a>
                </li>

                <li className="tabnav-item">
                  <a onClick={() => {if(step == 3)this.jumpSteps(2)}} className={`tablist-link ${step == 1 ? 'disabled' : 'visible'}`}>
                    确认产品
                  </a>
                </li>
                <li className="tabnav-item">
                  <a className={`tablist-link ${step == 3 ? 'visible' : 'disabled'}`}>
                    付款方式
                  </a>
                </li>
                <li
                  id="tabnav-tab-controls-line"
                  className="tablist-navline"
                  style={{ left: step == 1 ? 330 : step == 2 ? 465 : 595, width: '71px' }}
                />
              </ul>
            </nav>
          </div>
        </div>
      </section>
    );
  }
}
export default StepOneComponet;
