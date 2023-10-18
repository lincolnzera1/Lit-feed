import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isSignedIn: boolean | null;
  children: ReactNode;
}

const Protected: React.FC<ProtectedRouteProps> = ({ isSignedIn, children }) => {
  /* if (isSignedIn === null) {
    return <div>Verificando autenticação...</div>;
  } */

  console.log("PODE ENTRAR?\nPorteiro: ", isSignedIn);

  console.log("dkowqpdwkqop");

  if (isSignedIn) {
    console.log("VC ESTÁ LOGADO!!!");
    return <>{children}</>; // Renderize o conteúdo protegido se estiver autenticado
  } else {
    console.log("VC NAO ESTÁ LOGADO");
    return <Navigate to="/login" />; // Redirecione para a página de login se não estiver autenticado
  }
};

export default Protected;
