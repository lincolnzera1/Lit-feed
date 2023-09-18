import React from "react";
import {
  FeedAppBar,
  BotaoPadrao,
  ButtonSair,
  DivBotoes,
} from "../pages/Feed/style";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../services/actions/logout";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

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

  return (
    <FeedAppBar>
      <h2>Bem vindo ao LIT</h2>
      <DivBotoes>
        <BotaoPadrao
          onClick={() => {
            navigate("/projetos");
          }}
        >
          Seus projetos
        </BotaoPadrao>
        <BotaoPadrao>Aniversariantes do mês</BotaoPadrao>
      </DivBotoes>
      <ButtonSair onClick={handleLogout}>Sair</ButtonSair>
    </FeedAppBar>
  );
};

export default AppBar;
