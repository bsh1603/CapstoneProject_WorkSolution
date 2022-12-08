import { Line } from "react-chartjs-2";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Suspense, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { chartState, userState } from "../recoil/atom";
import { chartDataState } from "../recoil/selector";

const ChartWrapper = styled.div`
    width : 650px;
    height : 800px;
`;


const WorkChart = () => {
  const data = useRecoilValue(chartDataState);

  const chartRef = useRef(null);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  return (
        <ChartWrapper>

      <Line data={data} ref={chartRef} />

        </ChartWrapper>
  );
};

export default WorkChart;