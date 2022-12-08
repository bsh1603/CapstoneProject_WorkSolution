import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import MediaControlCard from "../components/MediaControlCard";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import profile from "../assets/NewJeans.jpg";
import profit from "../assets/profit.jpg";
import styled from 'styled-components';
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useState } from "react";
import { useRef } from "react";
import { userState, memberState } from "../recoil/atom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avvvatars from 'avvvatars-react';
import { Avatar} from "antd";
import EditIcon from '@mui/icons-material/Edit';
import { useRecoilValue, useRecoilState } from "recoil";
import axios from "axios";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

const Profile = styled.img`
    width: 300px;
    height: 300px;
`;

const Profit = styled.img`
    width: 400px;
    height: 330px;
`;

const ToDo = styled.div`
    padding-left : 5px auto;
`
const CB = styled.div`
    margin-left : 10px;
`
const Font = styled.div`
    font-family: 'Rajdhani'
`

const style = {
  width: '100%',
  maxWidth: 650,
  bgcolor: 'background.paper',
};

export default function MediaCard({role}) {

    const user = useRecoilValue(userState);
    const [member, setMember] = useRecoilState(memberState);
    const memberUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
      axios.get(`/api/member/my/${memberUser.id}`).then((response) => {
        setMember(response.data);
        console.log(member);
      });
    }, []);

    const navigate = useNavigate();

    const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    const fileInput = useRef(null)
    const [File, setFile] = useState("")

    const onChange = (e) => {
    	if(e.target.files[0]){
                setFile(e.target.files[0])
            }else{ //업로드 취소할 시
                setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
                return
            }
    	//화면에 프로필 사진 표시
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2){
                    setImage(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        };

      const [state, setState] = React.useState({
        ab: true,
        abc: false,
        abcd: false,
        abcde: true,
        abcdef: true,
        cda: true,
        dcba: true,
        edcaba: true,
      });

      const handleChange = (event) => {
        setState({
          ...state,
          [event.target.name]: event.target.checked,
        });
      };

      const { ab, abc, abcd, abcde, abcdef, cda, dcba, edcba } = state;
      const error = [ab, abc, abcd, abcde, abcdef, cda, dcba, edcba].filter((v) => v).length !== 8;

    return (
    <Font>
      <Box sx={{flexGrow : 1}}>
      <Grid container spacing = {2}>
        <Grid xs = {6}>
        <Card sx={{ maxWidth: 3000 }, {flexDirection : 'row'}}>
          <Profile
            src={profile}>
          </Profile>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <List sx={style} component="nav" aria-label="mailbox folders">
                    <ListItem button>
                      <ListItemText primary = "Name :" />
                      <ListItemText>
                        <Grid container spacing = {1}>
                                <Grid xs = {3}>
                                     <Avvvatars value = {member.name}
                                        size={30} shadow={true}
                                        radius={10} border={false}
                                        borderSize = {10} borderColor = "lightblue" />
                                     </Grid>
                                <Grid xs = {9}>
                                <ListItemText primary = {member.name} />
                                </Grid>
                        </Grid>
                      </ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem button divider>
                      <ListItemText primary= "Email :"/>
                      <ListItemText primary= {member.email} />
                    </ListItem>
                    <ListItem button>
                      <ListItemText primary =  "Admin :"/>
                      <ListItemText primary= {member.admin} />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                      <ListItemText primary = "Phone :" />
                      <ListItemText primary= {member.phone} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                    <ListItemText primary = "Code :" />
                    </ListItem>
                        {role === "ROLE_MANAGER"
                              ?<ListItemText primary = {member.authentication_code} />
                              : null}
                  </List>
            </Typography>
            <Typography variant="body2" color="text.secondary">
            </Typography>
            <Button style={{right: 0, marginLeft: 500, marginBottom : 3}}
                    onClick ={ ()=> navigate("/profile/modify")}>
                <EditIcon />
            </Button>
          </CardContent>
          <CardActions>
          </CardActions>
        </Card>
        </Grid>
        <Grid xs = {4}>
              <MediaControlCard />
              <br/>
              <Card>
                          <Typography component="div" variant="h5">
                            <br/> <b> Monthly Earning </b> <br/>
                            <Profit
                                src={profit}>
                            </Profit>
                          </Typography>
              </Card>
         </Grid>
         <Grid xs = {2}>
            <Card sx={{ maxWidth: 500 }, {flexDirection : 'column'}}>
                <Typography gutterBottom variant="h5" component="div">
                <ToDo>
                To-Do LIST
                <CB>
                <FormControl
                    required
                    error={error}
                    component="fieldset"
                    sx={{ m: 3 }}
                    variant="standard"
                    >
                    <FormLabel component="legend">Finish All</FormLabel>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox checked={ab} onChange={handleChange} name="ab" />}
                            label="보고서 작성" />
                          <FormControlLabel
                            control={
                              <Checkbox checked={abc} onChange={handleChange} name="abc" />}
                            label="PPT 작성" />
                          <FormControlLabel
                            control={
                              <Checkbox checked={abcd} onChange={handleChange} name="abcd" />
                            }
                            label="영상 편집"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox checked={abcde} onChange={handleChange} name="abcde" />
                            }
                            label="FE 완성"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox checked={abcdef} onChange={handleChange} name="abcdef" />
                            }
                            label="레이아웃 완"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox checked={cda} onChange={handleChange} name="cda" />
                            }
                            label="Recoil 수정"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox checked={dcba} onChange={handleChange} name="dcba" />
                            }
                            label="차트 다양화"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox checked={edcba} onChange={handleChange} name="edcba" />
                            }
                            label="TODO"
                          />
                        </FormGroup>
                        <br />
                        <FormHelperText> * You have not finished *</FormHelperText>
                      </FormControl>
                </CB>
                </ToDo>
                </Typography>
            </Card>
         </Grid>
         </Grid>
        </Box>
      </Font>
      );
}

//              <Avatar
//                      src={Image}
//                      style={{margin:'20px'}}
//                      size={200}
//                      onClick={()=>{fileInput.current.click()}}/>
//               <input
//               	type='file'
//                  	style={{display:'none'}}
//                      accept='image/jpg,impge/png,image/jpeg'
//                      name='profile_img'
//                      onChange={onChange}
//                      ref={fileInput}/>