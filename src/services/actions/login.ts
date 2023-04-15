import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";

// const auth = getAuth();


export const logarUsuario = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(`Usuário ${user} logado com sucesso.`);

        // Get user display name
        const displayName = user.displayName;
        console.log(displayName + " é o nome da fera")        
        resolve(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Erro ao fazer login: ${errorMessage}`);
        reject(new Error(errorMessage));
      });
  });
};

