import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import styled from "styled-components";

import { Suspense, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { doughnutState, userState } from "../recoil/atom";
import { doughnutDataState } from "../recoil/selector";

const ChartWrapper = styled.div`
    height : 500px;
    width : 600px;
`
const WorkDayChart = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = useRecoilValue(doughnutDataState);

  const chartRef = useRef(null);

  return (
    <ChartWrapper>
        <Doughnut data={data} ref={chartRef}/>
    </ChartWrapper>
  );
};

export default WorkDayChart;
