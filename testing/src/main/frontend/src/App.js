import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";

import ChatSetting from "./pages/ChatSetting";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Member from "./pages/Member";
import Profile from "./pages/Profile";
import RegisterManager from "./pages/RegisterManager";
import RegisterWorker from "./pages/RegisterWorker";
import Stock from "./pages/Stock";
import Work from "./pages/Work";
import ProfileModify from "./pages/ProfileModify";
import StockModify from "./pages/StockModify";
import Graph from "./pages/Graph";

import { userState } from "./recoil/atom";

import styled from "styled-components";
import Header from "../src/components/Header";
import NavBar from "../src/components/NavBar";
import Sidebar from "../src/components/Sidebar";
import "./App.css";

//  const user = useRecoilValue(userState);

function App() {

  return (
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/registermanager" element={<RegisterManager />} />
        <Route path="/registerworker" element={<RegisterWorker />} />
        <Route path="/login" element={<Login />} />
        <Route path="/work" element={<Work />} />
        <Route path="/member" element={<Member />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/chatsetting" element={<ChatSetting />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/modify" element={<ProfileModify />} />
        <Route path="/stock/modify" element={<StockModify />} />
      </Routes>
//    </div>
  );
}

export default App;

//const NavWrapper = styled.div`
// padding-top : 150px;
//`;
//
//    <div className = "App">
//      <Header />
//      <div className = "container">
//        <NavWrapper>
//        <Sidebar />
//        </NavWrapper>
//        <div className = "others"> other pages </div>
//      </div>