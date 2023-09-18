import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export const handleLogout = async () => {
  // const navigate = useNavigate();
  try {
    await signOut(auth);
    console.log("Usuário deslogado");
    console.log("SAINDOOOO");
    // navigate('/');
    // Adicione aqui o código para redirecionar o usuário para a página de login, por exemplo.
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
};
