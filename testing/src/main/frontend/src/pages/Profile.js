import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MediaCard from "../components/MediaCard";
import Memo from "../components/ProfileComponent/Memo";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState, memberState, workState } from "../recoil/atom";
import { useEffect } from "react";

const Profile = () => {
  const user = useRecoilValue(userState);
  const [member, setMember] = useRecoilState(memberState);
  const [work, setWork] = useRecoilState(workState);
  const memberUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get(`/api/member/my/${memberUser.id}`).then((response) => {
      setMember(response.data);
      console.log(member);
    });

    return () => {
      setMember({
        id: undefined,
        name: undefined,
        admin: undefined,
        email: undefined,
        phone: undefined,
      });
      console.log('member초기화 완료');
    }
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <div>
        <InputWrapper>
          <div>
            <MediaCard role={user.admin} />
          </div>
          <div></div>
        </InputWrapper>
      </div>
    </>
  );
};

export default Profile;

const Top = styled.button`
  position: fixed;
  bottom: 20%;
  right: 2rem;

  width: 100px;
  height: 50px;
  color: white;
  border: #a673ff;
  border-radius: 50px;
  background: black;
`;

const InputWrapper = styled.div`
  position: relative;
  text-align: center;
  margin-top: 150px;
  margin-left: 400px;
  background: white;
  width: 1300px;
  //  border : 1px solid;
  //  border-color : red;
`;

const BtnWrapper = styled.div`
  top: 50%;
  left: 30rem;
  max-width: 600px;
`;

//  const viewProfile = () => {
//    const userData = {
//        email: email,
//        name: name,
//        pwd: pwd,
//        phone: phone
//    };
//
//    axios
//        .post("/api/member/modify/1", userData)
//        .then(function (response) {
//            console.log(response);
//            setEmail("");
//            setName("");
//            setPwd("");
//            setPhone("");
//        })
//        .catch(function (error){
//            console.log(error);
//            alert("프로필 수정 실패");
//        });