import React from 'react';
import './header.css';

function Header() {
  return (
    <section className="wrap">
      <header className="header">
        <h1 className="header-title">코로나-19 바이러스 정말 싫으다!!!</h1>
      </header>
      <ul className="tab-area">
        <li className="item">국내</li>
        <li className="item">해외</li>
      </ul>
    </section>
  );
}

export default Header;
