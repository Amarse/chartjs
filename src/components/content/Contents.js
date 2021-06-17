import './contents.css';
import { React, useState } from 'react';

function Contents() {
  let [charts, getCharts] = useState();

  return (
    <section className="wrap">
      {/* <h3 className="tab-title">국내 코로나 현황</h3> */}
      <main className="main-content">그래프 들어갈 자리</main>
    </section>
  );
}

export default Contents;
