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
import Button from "@mui/material/Button";

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

export default function BasicTable({ user }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell> 이름 </StyledTableCell>
            <StyledTableCell align="center"> 이메일 </StyledTableCell>
            <StyledTableCell align="center"> 비밀번호 </StyledTableCell>
            <StyledTableCell align="center"> 전화번호 </StyledTableCell>
            <StyledTableCell align="center"> 직책 </StyledTableCell>
            <StyledTableCell align="center"> 지점 </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((user) => (
            <StyledTableRow
              key={user.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {user.name}
              </StyledTableCell>
              <StyledTableCell align="center">{user.email}</StyledTableCell>
              <StyledTableCell align="center">{user.pwd}</StyledTableCell>
              <StyledTableCell align="center">{user.phone}</StyledTableCell>
              <StyledTableCell align="center">{user.admin}</StyledTableCell>
              <StyledTableCell align="center">{user.team_name}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
