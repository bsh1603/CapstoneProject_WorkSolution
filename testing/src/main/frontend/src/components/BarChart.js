import React from 'react';
import { Bar } from "react-chartjs-2";
import styled from "styled-components";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Suspense, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { barState, userState } from "../recoil/atom";
import { barDataState } from "../recoil/selector";

const BarWrapper = styled.div`
    width : 650px;
    height : 800px;
`;

const BarChart = () => {
  const data = useRecoilValue(barDataState);

  const chartRef = useRef(null);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


//export const options = {
//  responsive: true,
//  plugins: {
//    legend: {
//      position: 'top' as const,
//    },
//    title: {
//      display: true,
//      text: 'Chart.js Bar Chart',
//    },
//  },
//};

  return (
    <BarWrapper>

      <Bar data={data} ref={chartRef} />

    </BarWrapper>
  );
};

export default BarChart;
