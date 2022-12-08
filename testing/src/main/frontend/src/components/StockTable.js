import * as React from "react";
import { styled } from '@mui/material/styles';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function BasicTable({ rows }) {

    useEffect(() => {
        console.log('StockTable 마운트')
        console.log('stocktable : ', rows);
      },[])

    const handleDelete = (id) => {
      axios.post(`/api/stock/delete/${id}`).then(alert("삭제되었습니다."));
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
          {rows.map((row) => (
            <StyledTableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.price}</StyledTableCell>
              <StyledTableCell align="center">{row.quantity}</StyledTableCell>
              <StyledTableCell align="center">{row.date}</StyledTableCell>
              <StyledTableCell align="center">
                <EditIcon />
              </StyledTableCell>
              <StyledTableCell align="center">
                <DeleteIcon onClick ={()=>handleDelete(row.id)} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}