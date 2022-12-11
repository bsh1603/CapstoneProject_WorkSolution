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

const ChartWrapper = styled.div`
    width : 700px;
    height : 500px;
`
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


  return (
    <ChartWrapper>
      <Bar
        data={data}
        ref={chartRef}

      />
    </ChartWrapper>
  );
};

export default BarChart;


//styled={{position : "relative", height: "700px"}}