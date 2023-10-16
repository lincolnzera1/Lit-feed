import React from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle } from "./Globaltheme";
import Cadastro from "./pages/Cadastro/Cadastro";
import Feed from "./pages/Feed/Feed";
import Login from "./pages/Login/login";
import Projetos from "./pages/Projetos/Projetos";

const App = () => {
  return (
    <div style={{
      margin: 0,
      padding: 0
    }}>
      <GlobalStyle />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/projetos" element={<Projetos />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
