import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarUsuario } from "../../firebaseConfig";
import { DateInput, LoginButton, LoginInput } from "../Login/style";
import { CadastroScreen, ContainerCadastro } from "./style";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setsenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [date, setDate] = useState<Nullable<Date>>(null);

  const handleDateChange = (e: any) => {
    setDate(e.target.value);

    console.log("sua data: " + e.target.value);
  };

  let navigate = useNavigate();

  const handleCadastrar = async () => {
    if (senha === "") {
      setErrorMessage("Campo de senha vazio.");
      console.log(senha);
    } else if (senha === confirmarSenha) {
      criarUsuario(email, senha, nome)
        .then((user) => {
          console.log(`Usuário ${user} criado com sucesso.`);
          setErrorMessage("Conta criada!! 😬😬😬");
          navigate("/");
        })
        .catch((error) => {
          console.error(`Erro ao criar usuário: ${error.message}`);
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage("Senhas não são iguais ou campo de senha está vazio.");
    }
  };

  return (
    <CadastroScreen>
      <ContainerCadastro>
        <h2>E-lit</h2>
        {/* <p style={{ color: "red", padding: "10px", textAlign: "center" }}>
          {errorMessage}
        </p> */}

        <div
          className="p-fluid gap-4"
          style={{
            width: "600px",
          }}
        >
          <div className="p-field p-grid">
            <div className="p-col-12 p-md-10">
              <div className="p-inputgroup mb-3">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span>
                <InputText
                  id="nome"
                  placeholder="Nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="p-field p-grid  mb-3">
            <div className="p-col-12 p-md-10">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-id-card"></i>
                </span>
                <InputText
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="p-field p-grid  mb-3">
            <div className="p-col-12 p-md-10">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-lock"></i>
                </span>
                <Password
                  id="senha"
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setsenha(e.target.value)}
                  // toggleMask
                />
              </div>
            </div>
          </div>

          <div className="p-field p-grid  mb-3">
            <div className="p-col-12 p-md-10">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-lock"></i>
                </span>
                <Password
                  id="confirmarSenha"
                  placeholder="Confirmar Senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="p-field p-grid  mb-3">
            <div className="p-col-12 p-md-10">
              <Calendar
                id="dataNascimento"
                value={date}
                onChange={(e) => setDate(e.value)}
                showIcon
              />
            </div>
          </div>

          <div className="p-col-12">
            <Button label="Cadastrar" className="p-mt-3" />
          </div>
        </div>
      </ContainerCadastro>
    </CadastroScreen>
  );
};

export default Cadastro;
