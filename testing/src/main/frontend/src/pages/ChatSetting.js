import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import styled from "styled-components";
import ChatRoom from "../chat/ChatRoom";
import {useEffect, useState} from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/atom";
import { useRecoilValue, useRecoilState } from "recoil";
import { memberDataState } from "../recoil/selector";
import "../main.css"


const ChatSetting = () => {
  const member = useRecoilValue(memberDataState);
  const user = useRecoilValue(userState);
  useEffect(() => {

    console.log(member);
    console.log(user);
    //sender , team_id , team_name
    console.log(user.name);
    console.log(user.teamId);
    console.log(member[0].team_name);

    if(1){

        console.log("채팅창 통과되나요");

    }
  }, []);


  return (
    <>

      <div className="Mains">
        <ChatRoom sender_name = {user.name} team_id = {user.teamId} team_name ={member[0].team_name}/></div>


    </>
  );
};

export default ChatSetting;

const InputWrapper = styled.div`
  max-width: 1000px;
  text-align: center;
  margin: 30px auto`;

const NavWrapper = styled.div`
 padding-top : 150px;
`;