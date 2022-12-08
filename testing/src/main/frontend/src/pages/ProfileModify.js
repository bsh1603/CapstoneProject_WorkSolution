import NavBar from "../components/NavBar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useRecoilValue, useRecoilState, useResetRecoilState } from "recoil";
import { userState, memberState} from "../recoil/atom";
import { useEffect } from "react";

const ProfileModify = () => {

    const [user, setUser] = useRecoilState(userState);
    const navigate = useNavigate();
    const validatePhone = (phone) =>
      /010-\d{3,4}-\d{4}/.test(phone) ? true : false;

    const validatePwd = (pwd2) => (pwd2 === pwd ? true : false);

    const validateEmail = (email) =>
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(
      email
      )
      ? true
      : false;

    const [email, emailChange, setEmail, emailValid] = useInput(
      user.email,
      validateEmail
    );

    const [name, nameChange, setName] = useInput(user.name);
    const [pwd, pwdChange, setPwd] = useInput("");
    const [pwd2, pwd2Change, setPwd2, pwdValid] = useInput("", validatePwd);
    const [phone, phoneChange, setPhone, phoneValid] = useInput(
    user.phone,
    validatePhone
    );

    const handleProfile = () => {

        const modifyData = {
            email: email,
            name: name,
            pwd: pwd,
            phone: phone,
        };



        axios
          .post(`/api/member/modify/${user.id}`, modifyData)
          .then(function (response) {
            // 응답 처리하기
            console.log(response);
            setEmail("");
            setName("");
            setPwd("");
            setPhone("");
            alert("다시 로그인해주세요.");
                    navigate('/login');



          })
          .catch(function (error) {
            console.log(error);
            alert("회원가입 실패");
          });
        }

  return (
  <>
  <Header />
  <div>
   <Sidebar />
      <InputWrapper>
        <TextField
          error={!emailValid}
          helperText={emailValid ? "" : "올바른 이메일을 형식을 입력하세요"}
          id="outlined-basic"
          label="이메일"
          variant="outlined"
          fullWidth={true}
          value={email}
          onChange={emailChange}
        />
      </InputWrapper>
      <InputWrapper>
        <TextField
          id="outlined-basic"
          label="이름"
          variant="outlined"
          fullWidth={true}
          value={name}
          onChange={nameChange}
        />
      </InputWrapper>
      <InputWrapper>
        <TextField
          id="outlined-password-input"
          label="새로운 비밀번호"
          type="password"
          autoComplete="current-password"
          fullWidth={true}
          value={pwd}
          onChange={pwdChange}
        />
      </InputWrapper>
      <InputWrapper>
        <TextField
          error={!pwdValid}
          helperText={pwdValid ? "" : "비밀번호가 일치하지 않습니다"}
          id="outlined-password-input"
          label="새로운 비밀번호 확인"
          type="password"
          autoComplete="current-password"
          fullWidth={true}
          value={pwd2}
          onChange={pwd2Change}
        />
      </InputWrapper>
      <InputWrapper>
        <TextField
          error={!phoneValid}
          helperText={
            phoneValid
              ? ""
              : "올바른 휴대폰 번호를 입력하세요 ex) 010-1234-5678"
          }
          id="outlined-basic"
          label="휴대폰 번호"
          variant="outlined"
          fullWidth={true}
          value={phone}
          onChange={phoneChange}
        />
      </InputWrapper>
      <InputWrapper>
        <Button
          variant="contained"
          fullWidth={true}
          size="large"
          onClick={() => {
            handleProfile();
            navigate("/profile");
          }}
        >
          프로필 수정
        </Button>
      </InputWrapper>
   </div>
   </>
  );
};

const InputWrapper = styled.div`
  max-width: 600px;
  text-align: center;
  margin: 30px auto;
`;

const BtnWrapper = styled.div`
  margin-top: 20px;
`;

export default ProfileModify;

//        axios
//        .post("/api/member/modify/${member_id}", modifyData)
//        .then(function (response) {
//            // 응답 처리하기
//            console.log(response);
//            setEmail("");
//            setName("");
//            setPwd("");
//            setPhone("");
//            alert("프로필 수정 성공");
//        })
//        .catch(function (error) {
//            console.log(error);
//            alert("프로필 수정 실패");
//        });
//    };