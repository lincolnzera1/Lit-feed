import React, { useRef, useState } from "react";
import {
  ContainerBrancoLogin,
  LoginButton,
  LoginInput,
  LoginScreen,
  LogoLit,
  SpanLogin,
} from "./style";

// Assets
import LitPng from "../../assets/lit.png";

// Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { criarUsuario, usuarioEstado } from "../../firebaseConfig";
import { logarUsuario } from "../../services/actions/login";
import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";

const Login = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [loadState, setLoadState] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<String>("");

  function handleClick() {
    // storeString("alouu");
  }

  function crie() {
    criarUsuario(email, senha, "nomeTeste");
  }

  async function esperarUmSegundo(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500); // 1000 milissegundos = 1 segundo
    });
  }

  // FORMIKS////////////////////////////////

  const toast = useRef<any>(null);
  const [visible, setVisible] = useState(false);

  type FormikTouchedKeys = {
    email?: string;
    senha?: string;
  };

  type FormikTouchedKeys2 = {
    email: string;
    senha: string;
  };

  const show = (menssagem: string, severity: string, detalhe: string) => {
    toast.current.show({
      severity: severity, // success
      summary: detalhe,
      detail: "acelere, bora",
    });
  };

  const formik = useFormik<FormikTouchedKeys2>({
    initialValues: {
      email: "",
      senha: "",
    },
    validate: (data) => {
      let errors: FormikTouchedKeys = {};

      if (!data.email) {
        errors!.email = "Digite um email!.";

        setErrorMessage("email");
      } else if (!data.senha) {
        errors!.senha = "Digite uma senha.";
        setErrorMessage("senha");
      }

      return errors;
    },
    onSubmit: async (data) => {
      console.log("seus dados: ", data);

      //////Adicionar o que quero/////////
      setLoadState(true);
      logarUsuario(data.email, data.senha)
        .then(async (user) => {
          /* console.log(
                  `Usuário ${JSON.stringify(user)} logado com sucesso`
                ); */
          // await usuarioEstado();
          navigate("/");
          setLoadState(false);
        })
        .catch((error) => {
          console.error(`Erro ao logarr: ${error.message}`);
          setLoadState(false);

          if (/auth\/user-not-found/.test(error.message)) {
            show("erro ao logar", "error", "Usuário não encontrado");
            console.log("Erro: Usuário não encontrado.");
          } else if (/auth\/wrong-password/.test(error.message)) {
            show("erro ao logar", "error", "Senha incorreta");
            console.log("Erro: Senha incorreta.");
          }
        });
      //////////////

      await esperarUmSegundo();

      // formik.resetForm();
      setVisible(false);
      // window.location.reload();
    },
  });

  type FormikTouchedKeys3 = "email" | "senha";

  const isFormFieldInvalid = (name: FormikTouchedKeys3) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name: FormikTouchedKeys3) => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error">{formik.errors[name]}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  return (
    <LoginScreen>
      <LogoLit src={LitPng} />
      <ContainerBrancoLogin>
        <h2>Bem-vindo</h2>
        <form action="#" onSubmit={formik.handleSubmit} style={{}}>
          <Toast ref={toast} />
          <LoginInput
            id="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={(e) => {
              formik.setFieldValue("email", e.target.value);
            }}
            className={classNames({
              "p-invalid": isFormFieldInvalid("email"),
            })}
          />
          <LoginInput
            id="senha"
            name="senha"
            placeholder="Senha"
            type="password"
            value={formik.values.senha}
            onChange={(e) => {
              formik.setFieldValue("senha", e.target.value);
            }}
            className={classNames({
              "p-invalid": isFormFieldInvalid("senha"),
            })}
          />
          {getFormErrorMessage(errorMessage as FormikTouchedKeys3)}
          <LoginButton type="submit">
            {loadState ? (
              <PacmanLoader
                style={{ textAlign: "center", position: "absolute", top: 10 }}
                color="red"
                size={14}
              />
            ) : (
              "Entrar"
            )}
          </LoginButton>
        </form>
        <p>
          Não possui conta?
          <SpanLogin onClick={() => navigate("/cadastro")}>
            Registre-se
          </SpanLogin>
        </p>
      </ContainerBrancoLogin>
    </LoginScreen>
  );
};

export default Login;
