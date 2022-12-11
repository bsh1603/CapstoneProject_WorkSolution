import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import Button from "@mui/material/Button";
import styled from "styled-components";
import Header from "../components/Header";
import { useEffect } from "react";
import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { memberState, userState, workState, teamState} from "../recoil/atom";
import moment from 'moment';
import Table from "../components/WorkTable";


const Work = () => {
  const user = useRecoilValue(userState);
  const [work, setWork] = useRecoilState(workState);
  const [team, setTeam] = useRecoilState(teamState);

  useEffect(() => {
      axios.get(`/api/member/my/${user.id}`)
        .then((response) => {
          setWork(response.data.works);
      console.log("work", work);
          // console.log('in callback',response.data.works)
      });
  }, []);
//    useEffect(() => {
//      axios.get(`api/member/myteam/${JSON.parse(localStorage.getItem("user")).id}`).then((response) => {
//        setTeam(response.data);
//      });
//    }, []);

//    console.log("팀아이디 확인");
//    console.log(team);

  return (
    <>
      <Header / >
      <Sidebar />
      <div>
        <InputWrapper>
            <Table rows={work} />
        </InputWrapper>
      </div>
    </>
  );
};

export default Work;

const InputWrapper = styled.div`
  position: relative;
  margin-top: 150px;
  margin-left: 300px;
  max-width: 1000px;
  text-align: center;
`;