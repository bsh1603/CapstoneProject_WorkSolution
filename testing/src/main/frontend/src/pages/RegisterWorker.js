import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import axios from "axios";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import verification from "../assets/verification.png"
import { useNavigate } from "react-router-dom";

const RegisterWorker = () => {
  const navigate = useNavigate();
  const validatePhone = (phone) =>
    /010-\d{3,4}-\d{4}/.test(phone) ? true : false;

  const validatePwd = (pwd2) => (pwd2 === pwd ? true : false);

  const validateEmail = (email) =>
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(
      email
    )
      ? true
      : false;

  const [email, emailChange, setEmail, emailValid] = useInput(
    "",
    validateEmail
  );
  const [name, nameChange, setName] = useInput("");
  const [pwd, pwdChange, setPwd] = useInput("");
  const [pwd2, pwd2Change, setPwd2, pwdValid] = useInput("", validatePwd);
  const [phone, phoneChange, setPhone, phoneValid] = useInput(
    "",
    validatePhone
  );
  const [code, codeChange, setCode] = useInput("");

  const handleRegister = () => {
    const userData = {
      email: email,
      name: name,
      pwd: pwd,
      phone: phone,
      authentication_code: code,
    };

    axios
      .post("/api/signup/worker", userData)
      .then(function (response) {
        // 응답 처리하기
        console.log(response);
        setEmail("");
        setName("");
        setPwd("");
        setPhone("");
        setCode("");
        alert("회원가입 성공");
      })
      .catch(function (error) {
        console.log(error);
        alert("회원가입 실패");
      });
  };
  return (
      <Box sx = {{width: '100%' }}>
          <Grid container rowSpacing = {1}>
              <Grid xs = {6}>
                  <Register
                      src = {verification}>
                  </Register>
                                  <Logo> ALBA24 </Logo>
              </Grid>
              <Grid xs = {6}>
    <LoginWrapper>
      <InputWrapper>
        <TextField
          error={!emailValid}
          helperText={emailValid ? "" : "올바른 이메일을 형식을 입력하세요"}
          id="outlined-basic"
          label="이메일"
          variant="outlined"
          fullWidth={true}
          value={email}
          onChange={emailChange}
        />
      </InputWrapper>
      <InputWrapper>
        <TextField
          id="outlined-basic"
          label="이름"
          variant="outlined"
          fullWidth={true}
          value={name}
          onChange={nameChange}
        />
      </InputWrapper>

      <InputWrapper>
        <TextField
          id="outlined-password-input"
          label="비밀번호"
          type="password"
          autoComplete="current-password"
          fullWidth={true}
          value={pwd}
          onChange={pwdChange}
        />
      </InputWrapper>
      <InputWrapper>
        <TextField
          error={!pwdValid}
          helperText={pwdValid ? "" : "비밀번호가 일치하지 않습니다"}
          id="outlined-password-input"
          label="비밀번호 확인"
          type="password"
          autoComplete="current-password"
          fullWidth={true}
          value={pwd2}
          onChange={pwd2Change}
        />
      </InputWrapper>

      <InputWrapper>
        <TextField
          error={!phoneValid}
          helperText={
            phoneValid
              ? ""
              : "올바른 휴대폰 번호를 입력하세요 ex) 010-1234-5678"
          }
          id="outlined-basic"
          label="휴대폰 번호"
          variant="outlined"
          fullWidth={true}
          value={phone}
          onChange={phoneChange}
        />
      </InputWrapper>

      <InputWrapper>
        <TextField
          id="outlined-basic"
          label="인증코드"
          variant="outlined"
          fullWidth={true}
          value={code}
          onChange={codeChange}
        />
      </InputWrapper>

      <InputWrapper>
        <Start
          variant="contained"
          onClick={() => {
            handleRegister();
            navigate("/login");
          }}
        >
          회원가입
        </Start>
      </InputWrapper>
    </LoginWrapper>
    </Grid>
    </Grid>
    </Box>
  );
};

const LoginWrapper = styled.div`
    margin-top:200px;
`;

const InputWrapper = styled.div`
  max-width: 500px;
  text-align: center;
  margin: 30px auto;
`;

const BtnWrapper = styled.div`
  margin-top: 20px;
`;

const Register = styled.img`
    width : 800px;
    height : 1000px;
    margin-left : 300px;
    text-align : center;
`

const Start = styled.button`

    width: 500px;
    height: 45px;
    color : white;
    border : #a673ff;
    background : black;
    border-radius: 10px;
    cursor : pointer;

    font-size : 1.3rem;
    font-family: 'watermelonsalad';
    font-weight : bold;
`;

const Logo = styled.div`
  position: relative;
  max-width : 300px;
  left : 53%;
  background: white;
  border: white;
  cursor: pointer;
  font-size: 3rem;
  letter-spacing: 5px;
  font-family: "watermelonsalad";
`;


export default RegisterWorker;