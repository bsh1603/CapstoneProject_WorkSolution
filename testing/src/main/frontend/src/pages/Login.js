import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/atom";

const Login = () => {
  const navigate = useNavigate();
  const [email, emailChange, setEmail] = useInput("");
  const [pwd, pwdChange, setPwd] = useInput("");
  const setUser = useSetRecoilState(userState);

  const handleLogin = () => {
    const loginData = { email: email, pwd: pwd };

    axios
      .post("/api/login", loginData)
      .then(function (response) {
        // 응답 처리하기
        const user = {
          id: response.data.id,
          name: response.data.name,
          admin: response.data.admin,
          email : response.data.email,
          phone : response.data.phone,
          code : response.data.authentication_code,
        };
        setUser(user);
        setEmail("");
        setPwd("");
        localStorage.setItem("user", JSON.stringify(user));
        console.log(user);
        // teamId 받아오기
                axios.get(`/api/member/myteam/${user?.id}`).then((response) => {
                  const teamId = response.data;
                  setUser({ ...user, teamId: teamId });
                });
        alert("로그인 성공");
      })
      .catch(function (error) {
        console.log(error);
        alert("로그인 실패");
      });
  };

  return (
    <LoginWrapper>
      <Wrapper>
        <TextField
          id="outlined-basic"
          label="이메일"
          variant="outlined"
          fullWidth={true}
          value={email}
          onChange={emailChange}
        />
      </Wrapper>

      <Wrapper>
        <TextField
          id="outlined-password-input"
          label="비밀번호"
          type="password"
          autoComplete="current-password"
          fullWidth={true}
          value={pwd}
          onChange={pwdChange}
        />
      </Wrapper>

      <Wrapper>
        <Button
          variant="contained"
          fullWidth={true}
          size="large"
          onClick={() => {
            handleLogin();
            navigate("/");
          }}
        >
          로그인
        </Button>
      </Wrapper>

      <Wrapper>
        <BtnWrapper>
          <Button
            variant="outlined"
            fullWidth={true}
            size="large"
            onClick={() => navigate("/registermanager")}
          >
            매니저 회원가입
          </Button>
        </BtnWrapper>
        <BtnWrapper>
          <Button
            variant="outlined"
            fullWidth={true}
            size="large"
            onClick={() => navigate("/registerworker")}
          >
            알바생 회원가입
          </Button>
        </BtnWrapper>
      </Wrapper>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
    margin-top : 300px;
`;

const Wrapper = styled.div`
  max-width: 500px;
  text-align: center;
  margin: 30px auto;
`;

const BtnWrapper = styled.div`
  margin-top: 20px;
`;

export default Login;