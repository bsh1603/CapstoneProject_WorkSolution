import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { teamState, userState, stockState } from "../recoil/atom";
import { useState } from "react";
import { TextField } from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import moment from "moment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

export default function BasicTable({ rows,setStocks }) {
  const [isEdit, setIsEdit] = useState(Array(rows.length).fill(false));
  const [newRows, setNewRows] = useState(rows);


  const getCurrentTime = () => {
    const date = new Date();
    const [hour, minute] = date.toTimeString().split(" ")[0].split(":");
    let [year, month, day] = date.toLocaleString().split(". ");
    if (day.length === 1) day = "0" + day;
    return `${year}-${month}-${day}T${hour}:${minute}`;
  };

  const handleDelete = (id) => {
    axios.post(`/api/stock/delete/${id}`).then(
    () =>
    {alert("삭제되었습니다.")
    window.location.replace("/stock")
    });
  };

  const sendEditData = (id, idx) => {
    const data = { ...newRows[idx], date: getCurrentTime() };
    console.log("수정한 데이터는", data);
    axios
      .post(`/api/stock/update/${id}`, data)
      .then(() => {
        alert("수정 완료")
        window.location.replace("/stock");
        const copyNewRows = [...newRows];
        copyNewRows[idx] = data;
        setStocks(copyNewRows); // stock 아톰 갱신
        console.log("콘솔", copyNewRows);

      })
      .catch((err) => console.error(err.message));
  };

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

  function subTime(time) {
    var realTime = moment(time).utc().format("MM월DD일 HH시:mm분");
    return realTime;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell> 이름 </StyledTableCell>
            <StyledTableCell align="center"> 가격 </StyledTableCell>
            <StyledTableCell align="center"> 수량 </StyledTableCell>
            <StyledTableCell align="center"> 수정날짜 </StyledTableCell>
            <StyledTableCell align="center"> 수정 </StyledTableCell>
            <StyledTableCell align="center"> 삭제 </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <StyledTableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {!isEdit[idx] ? (
                  row.name
                ) : (
                  <TextField
                    defaultValue={row.name}
                    onChange={(e) => {
                      let copyRows = [...newRows];
                      let copyRow = { ...copyRows[idx], name: e.target.value };
                      copyRows[idx] = copyRow;
                      setNewRows(copyRows);
                    }}
                  />
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {!isEdit[idx] ? (
                  row.price
                ) : (
                  <TextField
                    defaultValue={row.price}
                    onChange={(e) => {
                      let copyRows = [...newRows];
                      let copyRow = { ...copyRows[idx], price: e.target.value };
                      copyRows[idx] = copyRow;
                      setNewRows(copyRows);
                    }}
                  />
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {!isEdit[idx] ? (
                  row.quantity
                ) : (
                  <TextField
                    defaultValue={row.quantity}
                    onChange={(e) => {
                      let copyRows = [...newRows];
                      let copyRow = {
                        ...copyRows[idx],
                        quantity: e.target.value,
                      };
                      copyRows[idx] = copyRow;
                      setNewRows(copyRows);
                    }}
                  />
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {!isEdit[idx] ? (
                  subTime(row.date)
                ) : (
                  <TextField defaultValue={row.date} disabled />
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {!isEdit[idx] ? (
                  <EditIcon
                    onClick={() => {
                      let copyIsEdit = [...isEdit];
                      copyIsEdit[idx] = !copyIsEdit[idx];
                      setIsEdit(copyIsEdit);
                    }}
                  />
                ) : (
                  <SaveAsIcon
                    onClick={() => {
                      let copyIsEdit = [...isEdit];
                      copyIsEdit[idx] = !copyIsEdit[idx];
                      setIsEdit(copyIsEdit);
                      sendEditData(row.id, idx);
                    }}
                  />
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                <DeleteIcon onClick={() => handleDelete(row.id)} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}