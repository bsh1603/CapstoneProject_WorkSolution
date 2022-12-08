import Header from "../components/Header";
import styled from "styled-components";
import StockTable from "../components/StockTable";
import { useRecoilValue } from "recoil";
import Sidebar from "../components/Sidebar";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { stockDataState } from "../recoil/selector";
import { useEffect } from "react";

const Stock = () => {
  const navigate = useNavigate();
  const stock = useRecoilValue(stockDataState)

    useEffect(() => {
        console.log('Member 마운트')
        console.log('stock : ', stock);
      },[])

  return (
    <>
      <Header />
      <Sidebar />
      <div>
        <InputWrapper>
          <StockTable rows= {stock}/>
        </InputWrapper>
      </div>
      <Add onClick={() => navigate("/stock/modify")}>
        <AddIcon />
      </Add>
    </>
  );
};

export default Stock;

const InputWrapper = styled.div`
  position: sticky;
  padding-top: 150px;
  padding-left: 300px;
  max-width: 1000px;
  text-align: center;
`;

const Add = styled.button`
  position: fixed;
  bottom: 10%;
  right: 16rem;
  text-align: center;
  width: 100px;
  height: 50px;
  color: white;
  border: #a673ff;
  border-radius: 50px;
  background: black;
  cursor: pointer;
`;

const Edit = styled.button`
  position: fixed;
  bottom: 10%;
  right: 9rem;

  width: 100px;
  height: 50px;
  color: white;
  border: #a673ff;
  border-radius: 50px;
  background: black;
  cursor: pointer;
`;

const Delete = styled.button`
  position: fixed;
  bottom: 10%;
  right: 2rem;

  width: 100px;
  height: 50px;
  color: white;
  border: #a673ff;
  border-radius: 50px;
  background: black;
  cursor: pointer;
`;

//<InputWrapper>
//            <Table rows= {stock} />
//            <Add onClick = {() => navigate("/stock/modify")}>
//            <AddIcon />
//            </Add>
//            <Edit>
//            <EditIcon />
//            </Edit>
//            <Delete>
//            <DeleteIcon />
//            </Delete>
//        </InputWrapper>