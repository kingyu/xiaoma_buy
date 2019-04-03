import React from 'react';
import { Button } from 'antd';
import { static_domain } from 'utils/config';
import './styles.scss';

export default function() {
  return (
    <footer>
      <div className="footer-wrap">
        <div className="footer-content">
          <div className="nav-wrap">
            <nav>
              <ul className="nav-group group-1">
                <li className="headline">
                  <a href={`${static_domain}applet.html`}>小程序</a>
                </li>
                <li>
                  <a href={`${static_domain}pastime/`}>休闲娱乐</a>
                </li>
                <li>
                  <a href={`${static_domain}shop/`}>小马商城</a>
                </li>
                <li>
                  <a href={`${static_domain}food/`}>自助点餐</a>
                </li>
                <li>
                  <a href={`${static_domain}minisite/`}>自助建站</a>
                </li>
                <li className="headline">
                  <a href={`${static_domain}oem.html`}>OEM工厂</a>
                </li>
                <li>
                  <a href={`${static_domain}oem.html`}>技术支持</a>
                </li>
                <li>
                  <a href={`${static_domain}oem.html`}>购买流程</a>
                </li>
              </ul>
              <ul className="nav-group group-2">
                <li className="headline">
                  <a href={`${static_domain}smart.html#smart-header`}>SMART</a>
                </li>
                <li>
                  <a href={`${static_domain}smart.html#smart-header`}>MUI-视觉</a>
                </li>
                <li>
                  <a href={`${static_domain}smart.html#smart-header`}>卡片风格</a>
                </li>
                <li>
                  <a href={`${static_domain}smart.html#smart-header`}>交互理念</a>
                </li>
                <li>
                  <a href={`${static_domain}smart.html#smart-header`}>屏幕适配</a>
                </li>
                <li>
                  <a href={`${static_domain}smart.html#smart-header`}>产品体验</a>
                </li>
                <li>
                  <a href={`${static_domain}smart.html#smart-header`}>大数据</a>
                </li>
                <li>
                  <a href={`${static_domain}smart.html#smart-header`}>互联网营销</a>
                </li>
                <li>
                  <a href={`${static_domain}smart.html#smart-header`}>统计分析</a>
                </li>
                <li>
                  <a href={`${static_domain}smart.html#smart-header`}>智能推送</a>
                </li>
                <li>
                  <a href={`${static_domain}smart.html#smart-header`}>AI-Push 2.0</a>
                </li>
              </ul>
              <ul className="nav-group group-3">
                <li className="headline">
                  <a href={`${static_domain}protect.html#protect-title`}>保驾护航</a>
                </li>
                <li>
                  <a href={`${static_domain}protect.html#protect-system`}>系统稳定</a>
                </li>
                <li>
                  <a href={`${static_domain}protect.html#protect-data`}>数据安全</a>
                </li>
                <li>
                  <a href={`${static_domain}protect.html#protect-virtual`}>虚拟机隔离</a>
                </li>
                <li>
                  <a href={`${static_domain}protect.html#protect-network`}>网络传输</a>
                </li>
                <li>
                  <a href={`${static_domain}protect.html#protect-backup`}>灾备措施</a>
                </li>
                <li>
                  <a href={`${static_domain}protect.html#protect-performance`}>系统性能</a>
                </li>
              </ul>
              <ul className="nav-group group-4">
                <li className="headline">
                  <a href={`${static_domain}contact.html#contact-header`}>联系我们</a>
                </li>
                <li>
                  <a href={`${static_domain}contact.html#contact-introduce`}>公司简介</a>
                </li>
                <li>
                  <a href={`${static_domain}contact.html#contact-culture`}>小马文化</a>
                </li>
                <li>
                  <a href={`${static_domain}contact.html#cul-group-1`}>小马精神</a>
                </li>
                <li>
                  <a href={`${static_domain}contact.html#cul-group-2`}>小马愿景</a>
                </li>
                <li>
                  <a href={`${static_domain}contact.html#cul-group-3`}>管理理念</a>
                </li>
                <li>
                  <a href={`${static_domain}contact.html#cul-group-4`}>发展体系</a>
                </li>
                <li>
                  <a href={`${static_domain}contact.html#contact-office`}>公司环境</a>
                </li>
                <li>
                  <a href={`${static_domain}contact.html#contact-contact`}>联系方式</a>
                </li>
              </ul>
            </nav>
            <div className="hot-phone">
              <span>全国服务热线</span> <span>400-654-6993</span>
              <span>周一至周日8:30-18:00</span>
              <div className="service">
                <Button type="primary" icon="message" ghost onClick={()=>{if(document.getElementById('nb_invite_ok')){document.getElementById('nb_invite_ok').click()}}}>
                  联系客服
                </Button>
              </div>
            </div>
          </div>
          <div className="company">
            <div>
              <span>Co,Ltd AII Rights Reserved.小马飞腾信息技术有限公司</span>
            </div>
            <div className="attention-wrap">
              <div className="attention">关注我们：</div>
              <div className="XM2weima" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
