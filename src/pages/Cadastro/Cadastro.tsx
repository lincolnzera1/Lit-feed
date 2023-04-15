import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { criarUsuario } from '../../firebaseConfig';
import { LoginButton, LoginInput } from '../Login/style'
import { CadastroScreen, ContainerCadastro } from './style'

const Cadastro = () => {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setsenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    let navigate = useNavigate();

    const handleCadastrar = async () => {
        if (senha === "") {
            setErrorMessage("Campo de senha vazio.")
            console.log(senha)
        }
        else if (senha === confirmarSenha) {
            criarUsuario(email, senha, nome)
                .then((user) => {
                    console.log(`Usuário ${user} criado com sucesso.`);
                    setErrorMessage("Conta criada!! 😬😬😬")
                    navigate('/')
                })
                .catch((error) => {
                    console.error(`Erro ao criar usuário: ${error.message}`);
                    setErrorMessage(error.message)
                });
        } else {
            setErrorMessage("Senhas não são iguais ou campo de senha está vazio.")
        }
    }

    return (
        <CadastroScreen>
            <ContainerCadastro>
                <h2>E-lit</h2>
                <p style={{ color: "red", padding: "10px", textAlign: "center" }}>{errorMessage}</p>
                <LoginInput
                    placeholder='Nome'
                    onChange={(e) => setNome(e.target.value)}
                />
                <LoginInput
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <LoginInput
                    placeholder='Senha'
                    onChange={(e) => setsenha(e.target.value)}
                />
                <LoginInput
                    placeholder='Confirmar senha'
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                />
                <LoginButton onClick={handleCadastrar}>
                    Cadastre-se
                </LoginButton>

            </ContainerCadastro>
        </CadastroScreen>
    )
}

export default Cadastro