import NavBar from "../components/NavBar";
import Button from "@mui/material/Button";
import styled from "styled-components";
import Header from "../components/Header";
import { useEffect } from "react";
import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { memberState, userState } from "../recoil/atom";
import Table from "../components/Table";
import Sidebar from "../components/Sidebar";
import { memberDataState } from "../recoil/selector";

const Member = () => {
  const member = useRecoilValue(memberDataState);
  const user = useRecoilValue(userState);

  console.log("member", member);
  console.log("user", user);

  return (
    <>
      <Header />
      <Sidebar />
      <div>
        <InputWrapper>
          <div>
            <Table rows={member} role = {user.admin} />
          </div>
        </InputWrapper>
      </div>
    </>
  );
};

export default Member;

const Top = styled.button`
  position: fixed;
  bottom: 20%;
  right: 22rem;

  width: 100px;
  height: 50px;
  color: white;
  border: #a673ff;
  border-radius: 80px;
  background: black;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-top: 150px;
  margin-left: 300px;
  max-width: 1000px;
  text-align: center;
`;