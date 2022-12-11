import NavBar from "../components/NavBar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState, teamState } from "../recoil/atom";
import { memberDataState, stockDataState } from "../recoil/selector";
import { useEffect } from "react";
import Box from '@mui/material/Box';

const ProfileModify = () => {
    const navigate = useNavigate();

    const member = useRecoilValue(memberDataState);
    const user = useRecoilValue(userState);
    const stock = useRecoilValue(stockDataState);

    const [name, nameChange, setName] = useInput("");
    const [price, priceChange, setPrice] = useInput("");
    const [quantity, quantityChange, setQuantity] = useInput("");

    const handleStock = () => {
        const updateData = {
            name : name,
            price : price,
            quantity : quantity
        };

        axios
        .post(`/api/stock/${user.teamId}`, updateData)
        .then(function (response) {
            // 응답 처리하기
            console.log(stock);
            alert("재고 추가 성공")
            window.location.replace("/stock");
        })
        .catch(function (error) {
            console.log(error);
            alert("재고 추가 실패");
        });
    };
  return (
  <>
  <Header />
  <Sidebar />
  <div>
    <Wrapper>>
      <InputWrapper>
        <TextField
          label="이름"
          variant="outlined"
          fullWidth={true}
          value={name}
          onChange={nameChange}
        />
      </InputWrapper>
      <InputWrapper>
        <TextField
          label="가격"
          fullWidth={true}
          value={price}
          onChange={priceChange}
        />
      </InputWrapper>
      <InputWrapper>
        <TextField
          label="수량"
          variant="outlined"
          fullWidth={true}
          value={quantity}
          onChange={quantityChange}
        />
      </InputWrapper>
      <InputWrapper>
        <Button
          variant="contained"
          fullWidth={true}
          size="large"
          onClick={() => {
            handleStock();
            navigate("/stock");
          }}
        >
          재고 추가
        </Button>
      </InputWrapper>
      </Wrapper>
   </div>
   </>
  );
};

const Wrapper = styled.div`
    margin-top : 200px;
`

const InputWrapper = styled.div`
  max-width: 600px;
  text-align: center;
  margin: 30px auto;
`;

const BtnWrapper = styled.div`
  margin-top: 20px;
`;

export default ProfileModify;