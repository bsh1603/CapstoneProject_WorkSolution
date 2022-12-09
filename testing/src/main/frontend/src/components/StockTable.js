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

export default function BasicTable({ rows }) {
  const [isEdit, setIsEdit] = useState(Array(rows.length).fill(false));
  const handleDelete = (id) => {
    axios.post(`/api/stock/delete/${id}`).then(alert("삭제되었습니다."));
  };
  const [newRows, setNewRows] = useState(rows);
  const teamId = useRecoilValue(userState).teamId;

  const handleEdit = () => {};
  const getCurrentTime = () => {
    const date = new Date();
    const [hour, minute] = date.toTimeString().split(" ")[0].split(":");
    let [year, month, day] = date.toLocaleString().split(". ");
    if (day.length === 1) day = "0" + day;
    return `${year}-${month}-${day}T${hour}:${minute}`;
  };

  const sendEditData = (id) => {
    let data = newRows[id];
    data.date = getCurrentTime();

    axios
      .post(`/api/stock/update/${id}`, data)
      .then(() => alert("수정 완료"))
      .catch((err) => console.error(err.message));
  };
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
                    value={row.name}
                    onChange={(e) => {
                      let copyRows = [...newRows];
                      copyRows[idx].name = e.target.value;
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
                    value={row.price}
                    onChange={(e) => {
                      let copyRows = [...newRows];
                      copyRows[idx].price = e.target.value;
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
                    value={row.quantity}
                    onChange={(e) => {
                      let copyRows = [...newRows];
                      copyRows[idx].quantity = e.target.value;
                      setNewRows(copyRows);
                    }}
                  />
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {!isEdit[idx] ? row.date : <TextField value={row.date} disabled />}
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
                      sendEditData(row.id);
                      let copyIsEdit = [...isEdit];
                      copyIsEdit[idx] = !copyIsEdit[idx];
                      setIsEdit(copyIsEdit);
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