import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import axios from "axios";

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

export default function BasicTable({ rows, role }) {
  const handleDelete = (id) => {
    axios.post(`/api/member/dump/${id}`).then(alert("삭제되었습니다."));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell> 이름 </StyledTableCell>
            <StyledTableCell align="center"> 이메일 </StyledTableCell>
            <StyledTableCell align="center"> 전화번호 </StyledTableCell>
            <StyledTableCell align="center"> 직책 </StyledTableCell>
            {role === "ROLE_MANAGER"
                            ?<StyledTableCell align="center">삭제</StyledTableCell>
                            : null }
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
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">{row.phone}</StyledTableCell>
              <StyledTableCell align="center">{row.admin}</StyledTableCell>
              {role === "ROLE_MANAGER"
                                ?<StyledTableCell align="center">
                                 <Button>
                                     <DeleteIcon onClick ={()=>handleDelete(row.id)} />
                                 </Button>
                               </StyledTableCell>
                                : null}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}