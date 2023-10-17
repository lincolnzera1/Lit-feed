import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore/lite";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { getUserName } from "./services/actions/userState";
import { getDatabase, onValue, push } from "firebase/database";
import { ref, set } from "firebase/database";
import { uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { Nullable } from "primereact/ts-helpers";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyhuuSj4l8haaAjMfMeR3iVvWbDAyt9gg",
  authDomain: "e-lit-f5390.firebaseapp.com",
  projectId: "e-lit-f5390",
  storageBucket: "e-lit-f5390.appspot.com",
  messagingSenderId: "34741452193",
  appId: "1:34741452193:web:44f1f77062ec2944409fe0",
  measurementId: "G-BR2F0JQHGE",
  databaseURL: "https://e-lit-f5390-default-rtdb.firebaseio.com",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
// Initialize Firebase

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
export const storage = getStorage(app);
const db2 = getDatabase();

export function writeUserData(stringSimples: any) {
  const db = getDatabase();
  push(ref(db, "mensagens"), {
    stringSimples: stringSimples,
  });
}

const stringsRef = ref(database, "mensagens");
type StringData = {
  id: string;
  value: unknown;
};

export function listenStrings(callback: (strings: StringData[]) => void) {
  const db = getDatabase();
  const stringsRef = ref(db, "strings");

  const unsubscribe = onValue(
    stringsRef,
    (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const stringData = Object.entries(data).map(([id, value]) => ({
          id,
          value,
        }));
        callback(stringData);
      } else {
        callback([]);
      }
    },
    (error) => {
      console.error("Erro ao ler dados:", error);
    }
  );

  return unsubscribe;
}

// export const [mensagemErro, setMensagemErro] = useState("");

// Função para armazenar uma string na coleção "strings" do Firestore

export const storePost = async (post: string) => {
  const stringsCol = collection(db, "posts");
  const nome = await getUserName();

  try {
    const response = await addDoc(stringsCol, { autor: nome, post: post });
    console.log("String armazenada com sucesso: " + post);
  } catch (error) {
    console.log("aconteceu um erro ao storePost");
  }
};

export async function getPosts() {
  // console.log("oioioioi");
  const stringsCol = collection(db, "posts");
  const stringsSnapshot = await getDocs(stringsCol);
  const stringsList = stringsSnapshot.docs.map((doc) => doc.data());
  console.log(stringsList);
  return stringsList;
}

export async function getDatasDeNascimento() {
  // console.log("oioioioi");
  const stringsCol = collection(db, "cadastrosDatas");
  const stringsSnapshot = await getDocs(stringsCol);
  const stringsList = stringsSnapshot.docs.map((doc) => doc.data());
  console.log(stringsList);
  return stringsList;
}

export async function getProjetos() {
  // console.log("oioioioi");
  const stringsCol = collection(db, "projetos");
  const stringsSnapshot = await getDocs(stringsCol);
  const stringsList = stringsSnapshot.docs.map((doc) => doc.data());
  console.log(stringsList);
  return stringsList;
}

export const storeProject = async (nomeProjeto: string, descricao: string) => {
  const stringsCol = collection(db, "projetos");
  const nome = await getUserName();

  try {
    const response = await addDoc(stringsCol, {
      autor: localStorage.getItem("usuario"),
      nomeProjeto: nomeProjeto,
      descricao: descricao,
    });
    console.log("Projeto armazenado com sucesso: " + nomeProjeto);
  } catch (error) {
    console.log("aconteceu um erro ao storeProject");
  }
};

export const criarDataNascimento = async (
  nome: String,
  email: String,
  dataNascimento: Nullable<Date>
) => {
  const banco = collection(db, "cadastrosDatas");
  const usuario = await getUserName();

  try {
    const response = await addDoc(banco, {
      nome: nome,
      email: email,
      dataNascimento: dataNascimento,
    });
    console.log(
      "Cadastro com email " +
        email +
        " e data: " +
        dataNascimento +
        " feito com sucesso!"
    );
  } catch (error) {
    console.log("aconteceu um erro ao cadastrosDatas: " + error);
  }
};

export const criarUsuario = (
  email: String,
  password: String,
  displayName: String
) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email as string, password as string)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        // Update user profile with display name
        updateProfile(user, {
          displayName: displayName as string,
        })
          .then(() => {
            console.log(`Usuário ${user} criado com sucesso.`);
            resolve(user);
          })
          .catch((error) => {
            console.error(
              `Erro ao atualizar perfil do usuário: ${error.message}`
            );
            reject(
              new Error(`Erro ao atualizar perfil do usuário: ${error.message}`)
            );
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Erro ao criar usuário: ${errorMessage}`);
        reject(new Error(errorMessage));
      });
  });
};
