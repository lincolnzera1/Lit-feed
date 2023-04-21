import React, { useState } from 'react'
import { ContainerBrancoLogin, LoginButton, LoginInput, LoginScreen, LogoLit, SpanLogin } from './style'

// Assets
import LitPng from '../../assets/lit.png';

// Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { criarUsuario } from '../../firebaseConfig';
import { logarUsuario } from '../../services/actions/login';
import { useNavigate } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';

const Login = () => {

    let navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [loadState, setLoadState] = useState<boolean>(false);

    function handleClick() {
        // storeString("alouu");
    }

    function crie() {
        criarUsuario(email, senha, "nomeTeste");
    }
    return (
        <LoginScreen>
            <LogoLit src={LitPng} />
            <ContainerBrancoLogin>
                <h2>Bem-vindo</h2>
                <LoginInput
                    type="email"
                    placeholder='Digite Seu Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <LoginInput
                    type="password"
                    placeholder='Digite sua senha'
                    onChange={(e) => setSenha(e.target.value)}
                />
                <LoginButton
                    onClick={() => {
                        setLoadState(true);
                        logarUsuario(email, senha)
                            .then((user) => {
                                console.log(`Usuário ${JSON.stringify(user)} logado com sucesso`);
                                navigate('/feed');
                                setLoadState(false)
                            })
                            .catch((error) => {
                                console.error(`Erro ao logarr: ${error.message}`);
                                setLoadState(false)
                            });
                    }}>
                    {
                        loadState ?
                            <PacmanLoader style={{ textAlign: "center", position: "absolute", top: 10 }} color="red" size={14} />
                            :
                            "Entrar"
                    }
                </LoginButton>
                <p>Não possui conta?
                    <SpanLogin
                        onClick={() => navigate('/cadastro')}>Registre-se
                    </SpanLogin>
                </p>
            </ContainerBrancoLogin>
        </LoginScreen>
    )
}

export default Login