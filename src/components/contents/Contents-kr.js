import './contents.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

function ContentsKr() {
  const [confirmedData, setConfirmedData] = useState({});
  const [quarantinedData, setQuarantinedData] = useState({});
  const [comparedData, setComparedData] = useState({});

  //컴포넌트가 마운트가 됐을때(처음 실행) 바로 매소드를 실행 할 수 있게 하기 위해 useEffect 사용.
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get(
        'https://api.covid19api.com/total/dayone/country/kr'
      );
      getData(res.data);
      //console.log(res.data);
    };

    const getData = (items) => {
      const arr = items.reduce((acc, cur) => {
        const currentDate = new Date(cur.Date);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const date = currentDate.getDate();
        //년, 월, 일 추출
        const active = cur.Active;
        const confirmed = cur.Confirmed;
        const death = cur.Deaths;
        const recovered = cur.Recovered;

        const findItem = acc.find(
          (item) => item.year === year && item.month === month
        );
        if (!findItem) {
          acc.push({ year, month, date, active, confirmed, death, recovered });
        }
        if (findItem && findItem.date < date) {
          findItem.year = year;
          findItem.month = month;
          findItem.active = active;
          findItem.date = date;
          findItem.confirmed = confirmed;
          findItem.death = death;
          findItem.recovered = recovered;
        }
        return acc;
      }, []);

      const labels = arr.map((i) => `${i.month + 1} 월`);
      setConfirmedData({
        labels,
        datasets: [
          {
            label: '국내 누적 확진자',
            borderColor: '#32adec',
            backgroundColor: '#32adec',
            data: arr.map((i) => i.confirmed),
            fill: true,
          },
        ],
      });
      setQuarantinedData({
        labels,
        datasets: [
          {
            label: '월별 격리자',
            backgroundColor: '#f23e29',
            borderColor: '#f23e29',
            data: arr.map((i) => i.active),
          },
        ],
      });
      // const last = arr[arr.length - 1]; //마지막 인덱스만 가져온다.
      // setComparedData({
      //   tyep: 'pie',
      //   labels: ['확진자', '격리해제', '사망'],
      //   datasets: [
      //     {
      //       label: '누적 확인, 해체, 사망',
      //       borderColor: ['#32adec', '#16c26c', '#ffbc36'],
      //       backgroundColor: ['#32adec', '#16c26c', '#ffbc36'],
      //       data: [last.confirmed, last.recovered, last.death],
      //     },
      //   ],
      // });
      //console.log(arr);
    };

    fetchEvents();
  }, []);
  return (
    <section className="wrap">
      {/* <h3 className="tab-title">국내 코로나 현황</h3> */}
      <div className="main-content">
        <div className="bar-gra">
          <Bar
            data={confirmedData}
            options={
              ({
                titile: {
                  display: true,
                  text: '누적 확진자 추이',
                  fontsize: 16,
                },
              },
              { legend: { display: true, position: 'bottom' } })
            }
          />
        </div>
        <Line
          data={quarantinedData}
          options={
            ({
              titile: {
                display: true,
                text: '월별 격려자 현황',
                fontsize: 16,
              },
            },
            { legend: { display: true, position: 'bottom' } })
          }
        />

        {/* <Doughnut
          data={comparedData}
          options={
            ({
              titile: {
                display: true,
                text: `누적 확진, 해제, 사망 (${new Date().getMonth() + 1}월`,
                fontsize: 16,
              },
            },
            { legend: { display: true, position: 'bottom' } })
          }
        /> */}
      </div>
    </section>
  );
}

export default ContentsKr;
