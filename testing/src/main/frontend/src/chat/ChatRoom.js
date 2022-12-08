import React, { useEffect, useState, useRef } from 'react'
import {useParams} from "react-router-dom";
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';

import "../index.css"
import { create } from '@mui/material/styles/createTransitions';

var stompClient =null;
const ChatRoom = (props) => {
    const [privateChats, setPrivateChats] = useState(new Map());     
    const [publicChats, setPublicChats] = useState([]);
    const {roomId} = useParams();
    //초기 tab을 roomId로 설정
    const [tab,setTab] =useState(roomId);
    const scrollRef = useRef();
    const chatDiv = document.getElementsByClassName("chat-messages");
    const nowScrollY = chatDiv.scrollTop;


    

    const [userData, setUserData] = useState({
        username: props.sender_name,
        // 여기 팀 아이디 받아야함.
        receivername: props.team_id,
        teamname : props.team_name,
        connected: false,
        message: ''
      });
    useEffect(() => {
      console.log("=========== use effect =============")
      console.log(props.sender_name);
      console.log(props.team_name);
      
      CallMessage(props.team_id,userData.username,userData.message)
        registerUser()
         sleep(500);
    }, []);

    const connect =()=>{
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }

   

    const onConnected = () => {
        setUserData({...userData,"connected": true});
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
        userJoin();
    }

    const userJoin=()=>{
          var chatMessage = {
            senderName: userData.username,
            status:"JOIN"
          };
          stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload)=>{
        var payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                if(!privateChats.get(payloadData.senderName)){
                    privateChats.set(payloadData.senderName,[]);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                if(payloadData.receiverName!= userData.receivername){
                    break;
                }
                console.log("++++++public chat 확인 ++++++++")
                console.log(payloadData)
                console.log(typeof payloadData)
                console.log("++++++public chat 확인 ++++++++")
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    }
    
    const onPrivateMessage = (payload)=>{
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if(privateChats.get(payloadData.senderName)){
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        }else{
            let list =[];
            list.push(payloadData);
            privateChats.set(payloadData.senderName,list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError = (err) => {
        console.log(err);
        
    }

    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }

    //메세지 보내는 함수
    const sendValue=()=>{
            if (stompClient) {
              var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status:"MESSAGE",
                  receiverName: userData.receivername
              };
              console.log(chatMessage);
              stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
              setUserData({...userData,"message": ""});
            }
    }

    const onKeyPress = (e) =>{
        if(e.key == 'Enter'){
            sendValue();
            console.log("--------------------send value---------------------------")
            messagePost(userData.receivername,userData.username, userData.message);
        }
    }

    const sendPrivateValue=()=>{
        if (stompClient) {
          var chatMessage = {
            senderName: userData.username,
            receiverName:tab,
            message: userData.message,
            status:"MESSAGE"
          };
          
          if(userData.username !== tab){
            privateChats.get(tab).push(chatMessage);
            setPrivateChats(new Map(privateChats));
          }
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    }

    const handleUsername=(event)=>{
        const {value}=event.target;

        setUserData({...userData,"username": value});
    }

    function getUser(){
        axios.get('/user/12')
        console.log(" getUser success!! ");
    }


    function registerUser(username){
        console.log("register !");

        connect();


    }

    function sleep(ms) {
        const wakeUpTime = Date.now() + ms;
        while (Date.now() < wakeUpTime) {}
    }
    function CallMessage(firstid,sender,content){

        //메세지 정보들을 받아와야함.
        //잘 받았어!!

        console.log(firstid);

        axios.post(`/api/message/${roomId}`,{sender : sender ,roomId : firstid})
            .then((res)=>{
                console.log("Message Database processing +++++++++++++++++++++++");
                console.log(res.data[0].content)
                console.log(typeof res.data)
                for (var i in  res.data){
                    console.log(res.data[i])
                    //이러지말고 publicChat에 추가해주자.
                    //publicChat은 JSON같은 object형식이다.
                    var o1 ={senderName: res.data[i].sender, receiverName: firstid, message: res.data[i].content, date: null, status: 'MESSAGE'};
                    publicChats.push(o1)


                }
                //setUserData({...userData,"message":""});
                userData.message="";

                console.log("Message Database processing +++++++++++++++++++++++");
            }).catch((err)=>{console.log(err)})

        //이제 잘받은거 메세지로 쏴주면 되잖아?
    }

    function createroom(sender_name,room_number){

        // 입력 눌렀을때 실행되는 함수
        // axios.post로 hi 받아옴

        //방 생성 함수 !!!!
        // console.log("ROOOMMM+++++++++++++++++++++++");
        // console.log(sender_name);
        // console.log(room_number);
        axios.post("/api/room",{sender : sender_name, roomId : room_number})
            .then((res)=>{

                console.log(res.data);

            }).catch((err)=>{console.log(err)})

        
    }

    function messagePost(firstid ,sender , content){
        //메세지 저장하기 위해 보내는 함수
        // console.log("++++++++++ message test! +++++++++++++++");
        // console.log(typeof fristid);
        // console.log(sender);
        // console.log(content);
        axios.post(`/api/room/${userData.receivername}`,{roomId : firstid, sender : sender , content : content})
            .then((res)=>{
                console.log(res.data)
            }).catch((err)=>{console.log(err)})

    }


    return (
    <div className="container">
        {userData.username?
        <div className="chat-box">
            <div className="member-list">
                <ul>
                    <li onClick={()=>{setTab(userData.receivername)}} className={`member ${tab===userData.receivername && "active"}`}>{userData.teamname} chatroom</li>

                   {/*[...privateChats.keys()].map((name,index)=>(
                        <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                    ))*/}

                </ul>
            </div>

            {<div className="chat-content" >
                <ul className="chat-messages" ref={scrollRef} >
                    {publicChats.map((chat,index)=>(

                        <li className={`message ${(chat.senderName === userData.username || 3!=3) && "self"}`} key={index}>
                             {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>

                    ))}
                
                    
                </ul>
                {/* --------------------- */}
                {/* 메세지 실제로 보내는 부분 */}
                {/* --------------------- */}
                <div className="send-message">
                    <input type="text" className="input-message" placeholder="메세지를 입력하세요." value={userData.message} onKeyPress={onKeyPress} onChange={handleMessage} />
                    <button type="button" className="send-button" onClick={() => {
                        sendValue();
                        console.log("------------ sendvalue ------------");
                        console.log(typeof userData.receivername);
                        messagePost(userData.receivername,userData.username, userData.message);
                    }}>전송</button>
                </div>
                            
            </div>}
            {tab!==roomId && <div className="chat-content">
                <ul className="chat-messages">
                    {[...privateChats.get(tab)].map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">private send : {chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                </div>
            </div>}
        </div>
        :
            //멤버 인식
            //여기서 이름치고 입장함.
        <div className="register">
            <input
                id="user-name"
                placeholder="이름을 입력하세요"
                name="userName"
                value={userData.username}
                onChange={handleUsername}
                margin="normal"
              />
              <button type="button" onClick={() => {
                  //이게 일종의 멤버가 접근하는 버튼인데
                  //이때 메세지도 다 불러와야함.
                  //방 번호 주고 메세지 불러오자
                
              }} >
                    입장
              </button> 
        </div>}
    </div>
    )
}

export default ChatRoom
