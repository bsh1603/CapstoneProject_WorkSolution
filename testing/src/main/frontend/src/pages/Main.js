import NavBar from "../components/NavBar";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import WorkChart from "../components/WorkChart";
import BarChart from "../components/BarChart";
import WorkDayChart from "../components/WorkDayChart"
import PayMonthBarChart from "../components/PayMonthBarChart"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import sales from "../assets/sales.jpg";
import { useNavigate } from "react-router-dom";
import React from "react";
import { PlayCircleOutlined } from '@ant-design/icons';
import { StopOutlined } from '@ant-design/icons';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton"
import BlockIcon from '@mui/icons-material/Block';
import Grid from '@mui/material/Unstable_Grid2';
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { userState, isWorkingState } from "../recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import Stack from '@mui/material/Stack';

const Sales = styled.img`
        width: 250px;
        height: 170px;
`

const Main = () => {
  const [user, setUser] = useRecoilState(userState);
  const [isWorking, setIsWorking] = useRecoilState(isWorkingState);
  const navigate = useNavigate();

  const validateLocation = (myLat, myLong, latitude, longitude) => {
    const diffLat = Math.abs(myLat - latitude);
    const diffLong = Math.abs(myLong - longitude);
    if (diffLat < 0.05 && diffLong < 0.05) return true;
    return false;
  };

  const getCurrentTime = () => {
    const date = new Date();
    const [hour, minute] = date.toTimeString().split(" ")[0].split(":");
    let [year, month, day] = date.toLocaleString().split(". ");
    if(day.length === 1) day = "0" + day;
    return `${year}-${month}-${day}T${hour}:${minute}`;
  };

  const handleStart = () => {
    const date = new Date();
    const [hour, minute] = date.toTimeString().split(" ")[0].split(":");
    let [year, month, day] = date.toLocaleString().split(". ");
            if(day.length === 1) day = "0" + day;
    console.log("분", minute);
    const startTime = getCurrentTime();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        axios
          .get(`/api/work/start/location/${user.teamId}`)
          .then((response) => {
            const { latitude, longitude } = response.data;
            const isValid = validateLocation(
              position.coords.latitude,
              position.coords.longitude,
              longitude,
              latitude
            );

            if (!isValid) {
              alert("위치에서 벗어났습니다.");
              return;
            }

            axios
              .post(`/api/work/start/${user.id}`, {
                work_start_time: startTime,
              })
              .then((response) => {
                setIsWorking(true);
                alert("근무를 시작합니다.");
              })
              .catch((err) => console.error(err.message));
          });
      },
      (error) => {
        console.error(error);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity,
      }
    );
  };

  const handleEnd = () => {
    axios
      .post(`/api/work/end/${user.id}`, {
        work_end_time: getCurrentTime(),
      })
      .then((response) => {
        setIsWorking(false);
        alert("근무를 종료합니다.");
      })
      .catch((err) => console.error(err.message));
  };

  useEffect(() => {
      if (!user?.id) {
        const cache = JSON.parse(localStorage.getItem("user"));
        if (!cache) navigate("/login");
        setUser(cache);
      }

      axios.get(`/api/member/myteam/${user?.id}`).then((response) => {
        const teamId = response.data;
        setUser({ ...user, teamId: teamId });
      });
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <div>
      <InputWrapper>
        <Grid container spacing = {7}>
           <Grid xs = {4}>
                <Card sx={{ maxWidth: 1500 }, {flexDirection : 'row'}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <Start onClick = {handleStart} disabled={isWorking}>
                            <PlayCircleOutlined />
                            근무시작
                            </Start>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        <Grid xs = {4}>
            <Card sx={{ maxWidth: 1500 }, {flexDirection : 'row'}}>
                <CardContent>
                    <Typography gutterBottom  variant="h5" component="div">
                        <End onClick = {handleEnd}>
                        <StopOutlined />
                        근무종료
                        </End>
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid xs = {4}>
            <Card sx={{ maxWidth: 1500 }, {flexDirection : 'row'}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <Sales src = {sales} />
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        </Grid>
        </InputWrapper>
        <div>
            <br/>
            <br/>
            <br/>
        </div>
        <Grid container spacing = {2}>
        <Grid xs = {5.5}>
        <GraphWrapper>
            <PayMonthBarChart />
        </GraphWrapper>
        </Grid>
        <Grid xs = {5.5}>
        <Graph2Wrapper>
            <BarChart />
        </Graph2Wrapper>
        </Grid>
        <Grid xs = {2}>
            분할용
        </Grid>
        </Grid>
      </div>
    </>
  );
};
export default Main;

const Start = styled.button`

    width: 300px;
    height: 180px;
    color : black;
    border : #a673ff;
    background : lightblue;
    border-radius: 30px;
    cursor : pointer;

    &:hover:before{
        content : "";
        position: absolute;
        top : 0;
        left : 0;
        width : 30%;
        height : 100%;
        background: rgba(0,0,0,.1);
        border-radius: 30px;
    }

    font-size : 2.7rem;
    font-family: 'Rajdhani'
`;

const End = styled.button`
    width: 300px;
    height: 180px;
    color : black;
    border : #a673ff;
    background : pink;
    border-radius: 30px;
    cursor : pointer;

    &:hover:before {
            content : "";
            position: absolute;
            top : 0;
            left : 35%;
            width : 30%;
            height : 100%;
            background: rgba(0,0,0,.1);
            border-radius: 30px;
        }

    font-size : 2.7rem;
    font-family: 'Rajdhani'
`;

const InputWrapper = styled.div`
  position : fixed;
  text-align: center;
  margin-top : 150px;
  margin-left : 300px;
  background : white;
  width : 1300px;

//const BtnWrapper = styled.div`
//  position : fixed;
//  max-width: 1000px;
//  text-align: center;
//  margin-top : 180px;
//  margin-left: 360px;
//`;
//
//const Btn2Wrapper = styled.div`
//  position : fixed;
//  max-width: 1000px;
//  text-align: center;
//  margin-top : 180px;
//  margin-left: 760px;
//`;

const GraphWrapper = styled.div`
  position : fixed;
  margin-top : 340px;
  margin-left : 300px;
`;

const Graph2Wrapper = styled.div`
  position : fixed;
  margin-top : 340px;
  margin-left : 150px;
`;


const NavWrapper = styled.div`
 padding-top : 150px;
`;

//        <IconButton aria-label="work start" size = "large" color="success">
//            <PlayCircleOutlined />
//        </IconButton>

//
//    if (!user.id) {
//      const cache = JSON.parse(localStorage.getItem("user"));
//      if (!cache) navigate("/login");
//      setUser(cache);
//    }