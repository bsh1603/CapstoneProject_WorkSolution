import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import MediaControlCard from "../components/MediaControlCard";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import profile from "../assets/NewJeans.jpg";
import profit from "../assets/profit.jpg";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { useRef } from "react";
import { userState, memberState, workState } from "../recoil/atom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avvvatars from "avvvatars-react";
import { Avatar } from "antd";
import EditIcon from "@mui/icons-material/Edit";
import { useRecoilValue, useRecoilState } from "recoil";
import axios from "axios";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { workingTimeState } from "../recoil/selector";

const Profile = styled.img`
  width: 300px;
  height: 300px;
`;

const Profit = styled.img`
  width: 400px;
  height: 330px;
`;

const ToDo = styled.div`
  padding-left: 5px auto;
`;
const CB = styled.div`
  margin-left: 10px;
`;
const Center = styled.div`
  margin: 0 auto;
`;

const style = {
  width: "100%",
  maxWidth: 650,
  bgcolor: "background.paper",
  fontFamily: "watermelonsalad",
};

const Font = styled.div`
  font-family: "watermelonsalad";
`;

export default function MediaCard({ role }) {
  const user = useRecoilValue(userState);
  const workingTime = useRecoilValue(workingTimeState); // 일한시간 셀렉터
  const navigate = useNavigate();



  const [Image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const fileInput = useRef(null);
  const [File, setFile] = useState("");

  const [value, onChange] = useState(new Date());

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={6}>
          <Card sx={({ maxWidth: 3000 }, { flexDirection: "row" })}>
            <Profile src={profile}></Profile>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <List sx={style} component="nav" aria-label="mailbox folders">
                  <ListItem button>
                    <ListItemText primary="Name :" />
                    <ListItemText>
                      <Grid container spacing={1}>
                        <Grid xs={3}>
                          <Avvvatars
                            value={user.name}
                            size={30}
                            shadow={true}
                            radius={10}
                            border={false}
                            borderSize={10}
                            borderColor="lightblue"
                          />
                        </Grid>
                        <Grid xs={9}>
                          <ListItemText primary={user.name} />
                        </Grid>
                      </Grid>
                    </ListItemText>
                  </ListItem>
                  <Divider />
                  <ListItem button divider>
                    <ListItemText primary="Email :" />
                    <ListItemText primary={user.email} />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Admin :" />
                    <ListItemText primary={user.admin} />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText primary="Phone :" />
                    <ListItemText primary={user.phone} />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary="Code :" />
                  </ListItem>
                  {role === "ROLE_MANAGER" ? (
                    <ListItemText primary={user.code} />
                  ) : null}
                </List>
              </Typography>
              <Typography variant="body2" color="text.secondary"></Typography>
              <Button
                style={{ right: 0, marginLeft: 500, marginBottom: 3 }}
                onClick={() => navigate("/profile/modify")}
              >
                <EditIcon />
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={5}>
          <Card
            sx={
              ({ maxWidth: 500 },
              { flexDirection: "column" },
              { display: "inline" })
            }
          >
            <Center>
              <Calendar onChange={onChange} value={value} />
            </Center>
            <br />
            <br />
          </Card>
          <Card sx={{ maxWidth: 500 }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Font>
                <h2>오늘 일한 시간은 {workingTime} 분입니다.</h2>
              </Font>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

//              <Avatar
//                      src={Image}
//                      style={{margin:'20px'}}
//                      size={200}
//                      onClick={()=>{fileInput.current.click()}}/>
//               <input
//                  type='file'
//                     style={{display:'none'}}
//                      accept='image/jpg,impge/png,image/jpeg'
//                      name='profile_img'
//                      onChange={onChange}
//                      ref={fileInput}/>

//    const onChange = (e) => {
//       if(e.target.files[0]){
//                setFile(e.target.files[0])
//            }else{ //업로드 취소할 시
//                setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
//                return
//            }
//       //화면에 프로필 사진 표시
//            const reader = new FileReader();
//            reader.onload = () => {
//                if(reader.readyState === 2){
//                    setImage(reader.result)
//                }
//            }
//            reader.readAsDataURL(e.target.files[0])
//        };