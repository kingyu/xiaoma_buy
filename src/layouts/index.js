import React from 'react';
import './index.scss';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

function BasicLayout(props) {
  return (
    <React.Fragment>
      <Nav />
      <LocaleProvider locale={zh_CN}>
        <main className="main">
            {props.children}
        </main>
      </LocaleProvider>
      <Footer />
    </React.Fragment>
  );
}

export default BasicLayout;
