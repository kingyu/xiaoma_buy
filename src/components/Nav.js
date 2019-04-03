import React from 'react';
import { static_domain } from 'utils/config';
import './styles.scss';

class Nav extends React.Component {
  state = {
    isRibbon: false,
  };
  componentDidMount() {
    setTimeout(()=>{
      this.setState({
        isRibbon:true
      })
    },1000)
  }
  render() {
    return (
      <React.Fragment>
        <nav className="xm-nav">
          <div className="xm-content">
            <div className="xm-item xm-item-logo">
              <a className="xm-link xm-link-logo" href={`${static_domain}index.html`}>
                <span className="xm-link-text">小马飞腾</span>
              </a>
            </div>
            <div className="xm-list">
              <div className="xm-item">
                <a className="xm-link" href={`${static_domain}applet.html`}>
                  <span className="xm-link-text">小程序</span>
                </a>
              </div>
              <div className="xm-item">
                <a className="xm-link" href={`${static_domain}smart.html`}>
                  <span className="xm-link-text">SMART</span>
                </a>
              </div>
              <div className="xm-item">
                <a className="xm-link" href={`${static_domain}oem.html`}>
                  <span className="xm-link-text">OEM工厂</span>
                </a>
              </div>
              <div className="xm-item">
                <a className="xm-link" href={`${static_domain}protect.html`}>
                  <span className="xm-link-text">保驾护航</span>
                </a>
              </div>
              <div className="xm-item">
                <a className="xm-link" href={`${static_domain}contact.html`}>
                  <span className="xm-link-text">联系我们</span>
                </a>
              </div>
            </div>
            <div className="xm-item xm-item-user">
              <a className="xm-link xm-link-user" href="http://wxapp.xiaomafeiteng.com/login">
                <span className="xm-link-text">用户中心</span>
              </a>
            </div>
          </div>
        </nav>
        <div id="xm-placeholder" className="xm-nav-placeholder" />
        <nav id="xm-localnav" className="xm-localnav-scrim css-sticky">
          <div className="xm-localnav-wrapper">
            <div className="xm-localnav-background" />
            <div className="xm-localnav-content">
              <div className="xm-localnav-title">
                <a href="/buy/">购买</a>
              </div>
              <div className="xm-localnav-menu">
                <div className="xm-localnav-menu-tray">
                  <div className="xm-localnav-menu-items">
                    <div className="xm-localnav-menu-item">
                      <a href="#" className="xm-localnav-menu-link">
                        购买产品
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className={`ribbon ${!this.state.isRibbon?'ribbon-hide':''}`}>
          <div className="ribbon-wrapper">
            <div className="ribbon-content typography-body-reduced">
              <p>在小马飞腾四大产品中，自助建站因为某某原因（不告诉你的原因）于2019年4月30日上线</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Nav;