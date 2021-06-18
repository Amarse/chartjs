import React, { useState } from 'react';
import './header.css';
import ContentsKr from '../contents/Contents-kr';
import ContentsGb from '../contents/Contents-gb';

function Header() {
  const tabTitle = ['국내', '해외'];
  const tab = {
    0: <ContentsKr />,
    1: <ContentsGb />,
  };
  const [activeTab, setActiveTab] = useState(0);
  const onClickTab = (index) => {
    setActiveTab(index);
  };
  return (
    <section className="wrap">
      <header className="header">
        <h1 className="header-title">코로나-19 바이러스 정말 싫으다!!!</h1>
      </header>
      <div className="tab-area">
        {tabTitle.map((title, index) => {
          return (
            <span
              className="item"
              key={index}
              onClick={() => onClickTab(index)}
            >
              {title}
            </span>
          );
        })}
      </div>
      <div>{tab[activeTab]}</div>
    </section>
  );
}

export default Header;
