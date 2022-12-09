import { selector } from "recoil";
import { workState } from "./atom";
import { chartState, userState, barState, doughnutState, barPayState } from "./atom";
import axios from "axios";

const getWorkTime = (workTime) => {
  const [day, time] = workTime.split("T");
  const [hour, min] = time.split("-");
  const workMin = (Number(hour) - 9) * 60 + Number(min);
  return [day, workMin];
};

export const objWorkState = selector({
  key: "objWorkState",
  get: ({ get }) => {
    const workArray = get(workState);
    return workArray.reduce((acc, cur) => {
      const [day, workMin] = getWorkTime(cur.work_time);
      return { ...acc, [day]: workMin };
    }, {});
  },
});

export const chartDataState = selector({
  key: "chartDataState",
  get: async ({ get }) => {
    const user = get(userState);
    const response = await axios.get(`/api/work/chart/${user.id}`);
    const chartState = response.data;
    const labels = [...Object.keys(chartState)];
    labels.sort();
    labels.push("");
    const values = [...labels.map((key) => chartState[key]), 0];

    const data = {
      labels: labels,
      datasets: [
        {
          label: "일별 일한 시간",
          data: values,
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };
    return data;
  },
});

export const barDataState = selector({
  key: "barDataState",
  get: async ({ get }) => {
    const user = get(userState);
    const response = await axios.get(`/api/work/month/chart/${user.id}`);
    const barState = response.data;
    const labels = [...Object.keys(barState)];
    labels.sort();
    //    labels.push("")
    const values = [...labels.map((key) => barState[key])];

    const data = {
      labels: labels,
      datasets: [
        {
          label: "월별 일한 시간",
          data: values,
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };
    return data;
  },
});

export const doughnutDataState = selector({
  key: "doughnutDataState",
  get: async ({ get }) => {
    const user = get(userState);
    const response = await axios.get(`/api/work/korean/chart/${user.id}`);
    const doughnutState = response.data;
    const labels = ['월', '화', '수', '목', '금', '토', '일'];

    //    labels.push("")
    const values = [...labels.map((key) => doughnutState[key])];

    const options = {
        legend: {
            display: true,
        },
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                }
            }]
        },

        maintainAspectRatio: false
    }

    const data = {
      labels: labels,
      datasets: [
        {
          label: "요일별 일한 시간",
          data: values,
          fill: true,
          backgroundColor: [
              'rgba(249, 113, 213, 1)',
              'rgba(249, 177, 113, 1)',
              'rgba(220, 249, 113, 1)',
              'rgba(145, 249, 113, 1)',
              'rgba(113, 240, 249, 1)',
              'rgba(113, 156, 249, 1)',
              'rgba(163, 113, 249, 1)',

          ],
          borderColor: [
              'rgba(249, 113, 213, 1)',
              'rgba(249, 177, 113, 1)',
              'rgba(220, 249, 113, 1)',
              'rgba(145, 249, 113, 1)',
              'rgba(113, 240, 249, 1)',
              'rgba(113, 156, 249, 1)',
              'rgba(163, 113, 249, 1)',

          ],
          borderWidth: 1,
        },
      ],
    };
    return data;
  },
});

export const stockDataState = selector({
  key: "stockDataState",
  get: async ({ get }) => {
    const user = get(userState);
    const teamId = await (await axios.get(`/api/member/myteam/${user.id}`)).data;
    const stockData = await (await axios.get(`/api/stock/${teamId}`)).data;
    return stockData;
  },
});

export const memberDataState = selector({
  key: "memberDataState",
  get: async ({ get }) => {
    const user = get(userState);
    const response = await axios.get(`/api/member/${user.id}`);
    const memberData = response.data;

    return memberData;
  },
});

export const barPayDataState = selector({
  key: "barPayDataState",
  get: async ({ get }) => {
    const user = get(userState);
    const response = await axios.get(`/api/work/pay/month/${user.id}`);
    const barPayState = response.data;
    const labels = [...Object.keys(barPayState)];
    labels.sort();
    //    labels.push("")
    const values = [...labels.map((key) => barPayState[key])];

    const data = {
      labels: labels,
      datasets: [
        {
          label: "월별 급여",
          data: values,
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };
    return data;
  },
});