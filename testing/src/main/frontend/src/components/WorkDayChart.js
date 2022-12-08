import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import styled from "styled-components";

import { Suspense, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { doughnutState, userState } from "../recoil/atom";
import { doughnutDataState } from "../recoil/selector";

const DoughnutWrapper = styled.div`
    width : 650px;
    height : 800px;
`;

const WorkDayChart = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = useRecoilValue(doughnutDataState);
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

  const chartRef = useRef(null);

  return (
    <DoughnutWrapper>

    <Doughnut data={data} options={options} ref={chartRef}/>
    </DoughnutWrapper>
  );
};

export default WorkDayChart;
