import React from 'react';
import './index.scss';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
function BasicLayout(props) {
  return (
    <React.Fragment>
      <Nav />
      <main className="main">
          {props.children}
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default BasicLayout;
