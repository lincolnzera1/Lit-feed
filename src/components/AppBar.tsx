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
import Button from "@mui/material/Button";
const AppBar = () => {
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Usuário deslogado");
      console.log("SAINDOOOO");
      navigate("/"); // Use a função de navegação aqui
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSair = () => {
    handleLogout();
    setAnchorEl(null);
  };

  const handleProjetos = () => {
    setAnchorEl(null);
    navigate("/projetos");
  };

  const handleAniversariantes = () => {
    // handleLogout()
    setAnchorEl(null);
  };
  return (
    <FeedAppBar>
      <h2
        onClick={() => {
          navigate("/feed");
        }}
      >
        Bem vindo ao LIT
      </h2>
      <BotaoPadraoMobile onClick={handleClick}>Abrir Menu</BotaoPadraoMobile>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
        <MenuItem onClick={handleProjetos}>Seus projetos</MenuItem>
        <MenuItem onClick={handleAniversariantes}>
          Aniversariante do mês
        </MenuItem>
        <MenuItem onClick={handleLogout}>Sair</MenuItem>
      </Menu>
      <DivBotoes>
        <BotaoPadrao onClick={() => {navigate("/projetos")}}>Seus projetos</BotaoPadrao>
        <BotaoPadrao>Aniversariantes do mês</BotaoPadrao>
      </DivBotoes>
      <ButtonSair onClick={handleLogout}>Sair</ButtonSair>
    </FeedAppBar>
  );
};

export default AppBar;
