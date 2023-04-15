import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { updateProfile } from "firebase/auth";
import { getUserName } from './services/actions/userState';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAyhuuSj4l8haaAjMfMeR3iVvWbDAyt9gg",
    authDomain: "e-lit-f5390.firebaseapp.com",
    projectId: "e-lit-f5390",
    storageBucket: "e-lit-f5390.appspot.com",
    messagingSenderId: "34741452193",
    appId: "1:34741452193:web:44f1f77062ec2944409fe0",
    measurementId: "G-BR2F0JQHGE"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// export const [mensagemErro, setMensagemErro] = useState("");

// Função para armazenar uma string na coleção "strings" do Firestore

export const storePost = async (post: string) => {
    const stringsCol = collection(db, 'posts');
    const nome = await getUserName();
    await addDoc(stringsCol, { autor: nome, post: post,  });
    console.log('String armazenada com sucesso: ' + post);

}

export async function getPosts() {
    console.log("oioioioi")
    const stringsCol = collection(db, 'posts');
    const stringsSnapshot = await getDocs(stringsCol);
    const stringsList = stringsSnapshot.docs.map(doc => doc.data());
    console.log(stringsList)
    return stringsList;
}



export const criarUsuario = (email: string, password: string, displayName: string) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

                // Update user profile with display name
                updateProfile(user, {
                    displayName: displayName,
                })
                    .then(() => {
                        console.log(`Usuário ${user} criado com sucesso.`);
                        resolve(user);
                    })
                    .catch((error) => {
                        console.error(`Erro ao atualizar perfil do usuário: ${error.message}`);
                        reject(new Error(`Erro ao atualizar perfil do usuário: ${error.message}`));
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