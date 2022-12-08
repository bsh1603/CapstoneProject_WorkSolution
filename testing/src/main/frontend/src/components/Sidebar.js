import React from 'react';
import styled from 'styled-components';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Home from "@mui/icons-material/Home";
import People from "@mui/icons-material/People";
import PermMedia from "@mui/icons-material/PermMedia";
import Dns from "@mui/icons-material/Dns";
import Public from "@mui/icons-material/Public";
import profile from "../assets/dongguk.jpg";
import Divider from "@mui/material/Divider";
import { userState } from "../recoil/atom";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

const Profile = styled.img`
    width: 15
    0px;
    height: 200px;
    border-radius : 100%;
`

//const SidebarContents = styled.div`
//    width: 20%;
//    height: 200px;
//    display : flex;
//
//    flex-direction: column;
//    align-items: center;
//    justify-content: center;
//
//    padding-right: 1rem;
//    padding-left: 1rem;
//`;

const data = [
  { icon: <Dns />, label: "근무 조회", navigate: "work" },
  { icon: <People />, label: "팀원 조회", navigate: "member" },
  { icon: <PermMedia />, label: "재고 관리", navigate: "stock" },
  { icon: <Public />, label: "채팅방", navigate: "chatsetting" },
  { icon: <Public />, label: "출근도장", navigate: "profile" },
];

const Sidebar = () => {

        const navigate = useNavigate();


    return (
            <div className = "sidebar">
            <div className = "sidebarWrapper">
                <div className = "sidebarMenu">
                    <Profile src={profile} onClick = { () => navigate("/")}></Profile>
                    <h2 className = "sidebartitle"> <b> </b> </h2>
                    <h3 className = "sidebartitle"> </h3>
                    <Divider />
                    <Box
                        sx={{
                            bgcolor: 1 ? "rgb(240,239,239)" : null,
                            pb: 1 ? 2 : 0,
                        }}
                    >
                    <ListItemButton
                        alignItems="flex-start"
                        sx={{
                            px: 3,
                            pt: 5,
                            pb: 0,
                            "&:hover, &:focus": { "& svg": { opacity: 1 } },
                        }}
                    ></ListItemButton>
                    {data.map((item) => (
                    <ListItemButton
                        key={item.label}
                        sx={{ py: 0, minHeight: 50
                        , color: "black" }}
                        onClick={() => navigate(`/${item.navigate}`)}
                    >
                    <ListItemIcon sx={{ color: "inherit" }}>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                            fontSize: 22,
                            fontWeight: "small",
                        }}
                    />
                    </ListItemButton>
                        ))}
                    </Box>
                </div>
            </div>
            </div>
    );
};

export default Sidebar;

//    const [user, setUser] = useRecoilState(userState);
//
//      useEffect(() => {
//        if (!user.id) {
//          const cache = JSON.parse(localStorage.getItem("user"));
//          if (!cache) navigate("/login");
//          setUser(cache);
//        }
//      }, []);