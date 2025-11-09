import React from 'react';
import Header from '../Componentes/Header';
import { Outlet } from 'react-router';
import Footer from '../Componentes/Footer';


const Root = () => {
  return (
    <div>
      <Header></Header>
      <br />
      <br />

      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
