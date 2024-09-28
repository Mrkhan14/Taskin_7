import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <main className='position-relative'>
          <Outlet />
      </main>
    </Fragment>
  );
};

export default Layout;
