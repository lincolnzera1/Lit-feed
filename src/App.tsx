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

const App = () => {
  const [estaAutenticado, setEstaAutenticado] = useState<boolean | null>(null);
  const [verificandoAutenticacao, setVerificandoAutenticacao] = useState(true);

  useEffect(() => {
    const verificarAutenticacao = async () => {
      try {
        const usuarioAutenticado: boolean = await usuarioEstado();
        setEstaAutenticado(true);
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        setEstaAutenticado(false);
      } finally {
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
                  <Projetos />
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
