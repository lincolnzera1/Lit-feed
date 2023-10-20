import React, { useState } from "react";
import {
  FeedAppBar,
  BotaoPadrao,
  ButtonSair,
  DivBotoes,
  BotaoPadraoMobile,
} from "../pages/Feed/style";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../services/actions/logout";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { MenuButton, MenuOptions, MenuLink, MenuItem } from "./1styles";
import Menu from "@mui/material/Menu/Menu";

import { Menubar } from "primereact/menubar";
import getItems from "./Menu/Menu";
import { InputText } from "primereact/inputtext";

import Lit from "../assets/lit.png";
import { Button } from "primereact/button";

const AppBar = () => {
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Use a função de navegação aqui
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const items = getItems();
  // HEADER
  const start = <img alt="logo" src={Lit} height="40" className="mr-2"></img>;
  const end = <Button label="Sair" severity="danger" onClick={handleLogout} />;
  return (
    <div
      style={{
        /* position: "fixed",
        top: 0,
        width: "100vw", */
        zIndex: 10,
      }}
    >
      <Menubar model={items} start={start} end={end} />
    </div>
  );
};

export default AppBar;
