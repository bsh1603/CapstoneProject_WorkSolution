import NavBar from "../components/NavBar";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import WorkChart from "../components/WorkChart";
import BarChart from "../components/BarChart";
import { useNavigate } from "react-router-dom";
import React from "react";
import { PlayCircleOutlined } from '@ant-design/icons';
import { StopOutlined } from '@ant-design/icons';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton"
import BlockIcon from '@mui/icons-material/Block';
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { userState, isWorkingState } from "../recoil/atom";
import { useRecoilState } from "recoil";
import { useEffect } from "react";


const Main = () => {
  const [user, setUser] = useRecoilState(userState);
  const [isWorking, setIsWorking] = useRecoilState(isWorkingState);
  const navigate = useNavigate();

  const validateLocation = (myLat, myLong, latitude, longitude) => {
    const diffLat = Math.abs(myLat - latitude);
    const diffLong = Math.abs(myLong - longitude);
    if (diffLat < 0.005 && diffLong < 0.005) return true;
    return false;
  };

  const getCurrentTime = () => {
    const date = new Date();
    const [hour, minute] = date.toTimeString().split(" ")[0].split(":");
    const [year, month, day] = date.toLocaleString().split(". ");
    return `${year}-${month}-${day}T${hour}:${minute}`;
  };

  const handleStart = () => {
    const date = new Date();
    const [hour, minute] = date.toTimeString().split(" ")[0].split(":");
    const [year, month, day] = date.toLocaleString().split(". ");
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
      <WorkChart />
      <div>
        <InputWrapper>
            <Start onClick = {handleStart} disabled={isWorking}>
                <PlayCircleOutlined />
                근무시작

            </Start>
            <End onClick = {handleEnd}>
                <StopOutlined />
                근무종료
            </End>
        </InputWrapper>
      </div>
    </>
  );
};
export default Main;

const Start = styled.button`
    position : fixed;
    bottom : 70%;
    left : 18rem;

    width: 260px;
    height: 125px;
    color : black;
    border : #a673ff;
    background : lightblue;
    border-radius: 30px;
    cursor : pointer;

    &:hover:before {
        content : "";
        position: absolute;
        top : 0;
        left : 0;
        width : 100%;
        height : 100%;
        background: rgba(0,0,0,.1);
        border-radius: 30px;
    }

    font-size : 2.7rem;
    font-family: 'Rajdhani'
`;

const End = styled.button`
    position : fixed;
    bottom : 70%;
    left : 40rem;

    width: 260px;
    height: 125px;
    color : black;
    border : #a673ff;
    background : pink;
    border-radius: 30px;
    cursor : pointer;

    &:hover:before {
            content : "";
            position: absolute;
            top : 0;
            left : 0;
            width : 100%;
            height : 100%;
            background: rgba(0,0,0,.1);
            border-radius: 30px;
        }

    font-size : 2.7rem;
    font-family: 'Rajdhani'
`;

const InputWrapper = styled.div`
  max-width: 1000px;
  text-align: center;
  margin: 1px auto
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