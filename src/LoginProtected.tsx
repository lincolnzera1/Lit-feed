import React, { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { usuarioEstado } from "./firebaseConfig";

interface ProtectedRouteProps {
  isSignedIn: boolean | null;
  children: ReactNode;
}

const LoginProtected: React.FC<ProtectedRouteProps> = ({
  isSignedIn,
  children,
}) => {
  const [estaAutenticado, setEstaAutenticado] = useState<boolean | null>(null);
  const [verificandoAutenticacao, setVerificandoAutenticacao] =
    useState<boolean>(true);

  useEffect(() => {
    const verificarAutenticacao = async () => {
      try {
        const usuarioAutenticado: boolean = await usuarioEstado();
        console.log("CCCCCCCCC: ", usuarioAutenticado);
        setEstaAutenticado(usuarioAutenticado ? true : false);
      } catch (error) {
        setEstaAutenticado(false);
      } finally {
        setVerificandoAutenticacao(false); // Atualiza o estado de verificação
      }
    };

    verificarAutenticacao();
  }, []);

  console.log("PODE ENTRAR?\nPorteiro: ", estaAutenticado);

  if (estaAutenticado) {
    console.log("VC ESTÁ LOGADO!!!: ", estaAutenticado);
    return <Navigate to="/" />; // Renderize o conteúdo protegido se estiver autenticado
  } else if (verificandoAutenticacao) {
    return <div>Verificando autenticação...</div>;
  } else {
    console.log("VC NAO ESTÁ LOGADO", estaAutenticado);
    return <>{children}</>; // Redirecione para a página de login se não estiver autenticado
  }
};

export default LoginProtected;
