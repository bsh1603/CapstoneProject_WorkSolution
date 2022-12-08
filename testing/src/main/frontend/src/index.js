import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
  <React.Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.Suspense>
  </RecoilRoot>
);