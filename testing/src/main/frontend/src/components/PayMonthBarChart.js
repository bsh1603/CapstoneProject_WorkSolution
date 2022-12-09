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
import { barPayState, userState } from "../recoil/atom";
import { barPayDataState } from "../recoil/selector";

const BarWrapper = styled.div`
    width : 650px;
    height : 800px;
`;

const PayMonthBarChart = () => {
  const data = useRecoilValue(barPayDataState);

  const chartRef = useRef(null);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  return (
    <BarWrapper>

      <Bar data={data} ref={chartRef} />

    </BarWrapper>
  );
};

export default PayMonthBarChart;
