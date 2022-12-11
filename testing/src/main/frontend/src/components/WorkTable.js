import * as React from "react";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useEffect } from "react";
import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { memberState, userState, workState } from "../recoil/atom";
import moment from "moment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontFamily : "watermelonsalad"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily : "watermelonsalad"
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function BasicTable({ rows }) {
  const user = useRecoilValue(userState);
  const [member, setMember] = useRecoilState(memberState);
  const [work, setWork] = useRecoilState(workState);

  useEffect(() => {
    //      axios.get(`/api/member/my/${JSON.parse(localStorage.getItem("user")).id}`).then((response) => {
    //        setWork(response.data);
    //      });
    console.log("recoil word", work);
  }, []);

    const getTime = (timeString) => {
    let [date, time] = timeString?.split("T");
    time = " " + time.replace("-", ":") + ":00";
    const momentDate = date + time;
    const [hour, minute, second] = moment(momentDate, "YYYY-MM-DD HH:mm:ss")
      .subtract(9, "hours")
      .format()
      ?.split("+")[0]
      ?.split("T")[1]
      ?.split(":") || ['','',''];

    return `${hour} : ${minute}`;
  };

  const getWorkingTime = (minutes) => {
    const hour = parseInt(minutes / 60);
    let minute = minutes - (hour * 60);
    if (minute.length === 1) minute = '0' + minute;

    return `${hour}시간 ${minute}분`
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">no.</StyledTableCell>
            <StyledTableCell align="center">날짜</StyledTableCell>
            <StyledTableCell align="center">시작시간</StyledTableCell>
            <StyledTableCell align="center">종료시간</StyledTableCell>
            <StyledTableCell align="center">일한시간</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <StyledTableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row" align="center">
                {idx + 1}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.work_date}
              </StyledTableCell>
              <StyledTableCell align="center">
                {getTime(row.work_start_time)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {getTime(row.work_end_time)}
              </StyledTableCell>
              <StyledTableCell align="center">
                {getWorkingTime(row.work_time)}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}