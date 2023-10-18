import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle } from "./Globaltheme";
import Cadastro from "./pages/Cadastro/Cadastro";
import Feed from "./pages/Feed/Feed";
import Login from "./pages/Login/login";
import Projetos from "./pages/Projetos/Projetos";
import Protected from "./Protected";
import { usuarioEstado } from "./firebaseConfig";

const App = () => {
  const [estaAutenticado, setEstaAutenticado] = useState<boolean | null>(null);

  useEffect(() => {
    const verificarAutenticacao = async () => {
      try {
        const usuarioAutenticado: boolean = await usuarioEstado();
        setEstaAutenticado(true);
        console.log("Sua verificação deu certo: ", usuarioAutenticado);
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        setEstaAutenticado(false); // Define como falso em caso de erro
      }
    };

    verificarAutenticacao();
  }, []); // Executa somente uma vez, após a montagem do componente

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
      }}
    >
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route
            path="/"
            element={
              <Protected isSignedIn={estaAutenticado}>
                <Feed />
              </Protected>
            }
          />

          <Route
            path="/projetos"
            element={
              <Protected isSignedIn={estaAutenticado}>
                <Feed />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
