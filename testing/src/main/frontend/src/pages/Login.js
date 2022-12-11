import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import profile from "../assets/coming-soon.svg";
import React from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/atom";

const Login = () => {
  const navigate = useNavigate();
  const [email, emailChange, setEmail] = useInput("");
  const [pwd, pwdChange, setPwd] = useInput("");
  const setUser = useSetRecoilState(userState);

  const handleLogin = () => {
    const loginData = { email: email, pwd: pwd };

    axios
      .post("/api/login", loginData)
      .then(function (response) {
        // 응답 처리하기
        const user = {
          id: response.data.id,
          name: response.data.name,
          admin: response.data.admin,
          email : response.data.email,
          phone : response.data.phone,
          code : response.data.authentication_code,
        };
        setUser(user);
        setEmail("");
        setPwd("");
        localStorage.setItem("user", JSON.stringify(user));
        console.log(user);
        // teamId 받아오기
                axios.get(`/api/member/myteam/${user.id}`).then((response) => {
                  const teamId = response.data;
                  setUser({ ...user, teamId: teamId });
                });
        alert("로그인 성공");
      })
      .catch(function (error) {
        console.log(error);
        alert("로그인 실패");
      });
  };

  return (
    <Box sx = {{width: '100%' }}>
        <Grid container rowSpacing = {1}>
            <Grid xs = {5}>
                <Profile
                    src = {profile}>
                </Profile>
            </Grid>
            <Grid xs = {7}>
            <LoginWrapper>
                <Logo>ALBA 24</Logo>
                <Wrapper>
                    <TextField
                        id="outlined-basic"
                        label="이메일"
                        variant="outlined"
                        fullWidth={true}
                        value={email}
                        onChange={emailChange}
                    />
                </Wrapper>
                <Wrapper>
                    <TextField
                        id="outlined-password-input"
                            label="비밀번호"
                            type="password"
                            autoComplete="current-password"
                            fullWidth={true}
                            value={pwd}
                            onChange={pwdChange}
                    />
                </Wrapper>
                <Wrapper>
                    <Start
                        variant="contained"
                        onClick={() => {
                        handleLogin();
                        navigate("/");
                        }}>
                        로그인
                    </Start>
                </Wrapper>
                <Wrapper>
                <BtnWrapper>
                    <Register
                        variant="outlined"
                        fullWidth={true}
                        size="large"
                        onClick={() => navigate("/registermanager")}
                    >
                    매니저 회원가입
                    </Register>
                </BtnWrapper>
                <BtnWrapper>
                    <Register
                        variant="outlined"
                        fullWidth={true}
                        size="large"
                        onClick={() => navigate("/registerworker")}
                    >
                    알바생 회원가입
                    </Register>
                </BtnWrapper>
                </Wrapper>
               </LoginWrapper>
            </Grid>
        </Grid>
      </Box>
  );
};


const Wrapper = styled.div`
  max-width: 500px;
  text-align: center;
  margin: 30px auto;
`;

const BtnWrapper = styled.div`
  margin-top: 20px;
`;

const Profile = styled.img`
    margin-left: 300px;
    width : 1000px;
    height : 1000px;
`;

const LoginWrapper = styled.div`
    margin-top : 220px;
`
const Logo = styled.button`
  position: relative;
  left : 41%;
  background: white;
  border: white;
  cursor: pointer;
  font-size: 3rem;
  letter-spacing: 5px;
  font-family: "watermelonsalad";
`;

const Start = styled.button`

    width: 500px;
    height: 45px;
    color : white;
    border : #a673ff;
    background : black;
    border-radius: 10px;
    cursor : pointer;

    font-size : 1.3rem;
    font-family: 'watermelonsalad';
    font-weight : bold;
`;

const Register = styled.button`
    width: 500px;
    height: 45px;
    color : black;
    background : white;
    border-radius: 10px;
    border : 1px solid;
    cursor : pointer;

    font-size : 1.0rem;
    font-family: 'watermelonsalad';
    font-weight : bold;
`

export default Login;