import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle } from "./Globaltheme";
import Cadastro from "./pages/Cadastro/Cadastro";
import Feed from "./pages/Feed/Feed";
import Login from "./pages/Login/login";
import Projetos from "./pages/Projetos/Projetos";
import Protected from "./Protected";
import { auth, usuarioEstado } from "./firebaseConfig";
import { ProgressSpinner } from "primereact/progressspinner";
import LoginProtected from "./LoginProtected";
import AniversariosDoMes from "./pages/AnviersariosDoMes/AniversariosDoMes";
import AniversariosDoAno from "./pages/AniversariosDoAno/AnviersariosDoAno";

const App = () => {
  const [estaAutenticado, setEstaAutenticado] = useState<boolean | null>(null);
  const [verificandoAutenticacao, setVerificandoAutenticacao] = useState(true);

  useEffect(() => {
    const verificarAutenticacao = async () => {
      try {
        const usuarioAutenticado: boolean = await usuarioEstado();
        // console.log("esperado: ", usuarioAutenticado);
        // console.log("esperado123: ");
        setEstaAutenticado(usuarioAutenticado ? true : false);
      } catch (error) {
        // console.error("Erro ao verificar autenticação:", error);
        setEstaAutenticado(false);
      } finally {
        // console.log("passamos aqui?");
        setVerificandoAutenticacao(false); // Atualiza o estado de verificação
      }
    };

    verificarAutenticacao();
  }, []);

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
      }}
    >
      <GlobalStyle />
      <BrowserRouter>
        {verificandoAutenticacao ? (
          <div
            style={{
              height: "100vh",
              width: "100vw",
              display: "flex",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <ProgressSpinner
              style={{ width: "50px", height: "50px" }}
              strokeWidth="8"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          </div>
        ) : (
          <Routes>
            <Route
              path="/login"
              element={
                <LoginProtected>
                  <Login />
                </LoginProtected>
              }
            />
            <Route
              path="/cadastro"
              element={
                <LoginProtected>
                  <Cadastro />
                </LoginProtected>
              }
            />

            <Route
              path="/"
              element={
                <Protected>
                  <Feed />
                </Protected>
              }
            />

            <Route
              path="/projetos"
              element={
                <Protected>
                  <Projetos />
                </Protected>
              }
            />

            <Route
              path="/aniversariantes"
              element={
                <Protected>
                  <AniversariosDoMes />
                </Protected>
              }
            />

            <Route
              path="/datas"
              element={
                <Protected>
                  <AniversariosDoAno />
                </Protected>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
