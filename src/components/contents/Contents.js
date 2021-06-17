import './contents.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

function Contents() {
  const [confirmedData, setConfirmedDate] = useState({});
  //컴포넌트가 마운트가 됐을때(처음 실행) 바로 매소드를 실행 할 수 있게 하기 위해 useEffect 사용.
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get(
        'https://api.covid19api.com/dayone/country/kr'
      );
      getData(res.data);
      console.log(res.data);
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
          findItem.date = date;
          findItem.active = active;
          findItem.confirmed = confirmed;
          findItem.death = death;
          findItem.recovered = recovered;
        }
        return acc;
      }, []);
      const data = arr.map((i) => i.confirmed);
      const labels = arr.map((i) => `${i.month + 1} 월`);
      setConfirmedDate({
        labels,
        datasets: [
          {
            label: '국내 누적 확진자',
            backgroundColor: 'salmon',
            data,
            fill: true,
          },
        ],
      });
      console.log(arr);
    };
    // console.log(itemArray);
    // items.forEach((item) => console.log(item));

    fetchEvents();
  });
  return (
    <section className="wrap">
      {/* <h3 className="tab-title">국내 코로나 현황</h3> */}
      <div className="main-content">
        <Bar
          data={confirmedData}
          options={
            ({
              title: { display: true, text: '누적 확진자 추이', fontSize: 16 },
            },
            {
              legend: {
                display: true,
                position: 'bottom',
              },
            })
          }
        />
      </div>
    </section>
  );
}

export default Contents;
