import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";

/* onAuthStateChanged(auth, (user) => {
  console.log("O estado de autenticação mudou.")
  if (user) {
    console.log(`Usuário logado: ${user.displayName}`);
  } else {
    console.log('Usuário deslogado.');
  }
}); */

export const getUserName = async () => {
  const user = auth.currentUser;
  if (user) {
    const userName = await user.displayName;
    console.log(userName);
    return userName;
  } else {
    console.log('Usuário não logado');
    return "Nulo"
  }
}
