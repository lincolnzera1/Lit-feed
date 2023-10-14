import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarDataNascimento, criarUsuario } from "../../firebaseConfig";
import { DateInput, LoginButton, LoginInput } from "../Login/style";
import { CadastroScreen, ContainerCadastro } from "./style";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { logarUsuario } from "../../services/actions/login";

const Cadastro = () => {
  /* const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setsenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState(""); */
  const [errorMessage, setErrorMessage] = useState<String>("");
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

  // FORMIKS////////////////////////////////

  async function esperarUmSegundo(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500); // 1000 milissegundos = 1 segundo
    });
  }

  const toast = useRef<any>(null);
  const [visible, setVisible] = useState(false);

  const show = () => {
    toast.current.show({
      severity: "success",
      summary: "Conta criada",
      detail: `Email ${formik.values.email}`,
    });
  };

  const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
      date: null,
    },
    validate: (data) => {
      let errors = {};

      if (!data.nome) {
        errors!.nome = "nome is required.";
        setErrorMessage("nome");
      } else if (!data.email) {
        errors!.email = "Email is required.";
        setErrorMessage("email");
      } else if (!data.senha) {
        errors!.senha = "faltou a senha";
        setErrorMessage("senha");
      } else if (!data.confirmarSenha) {
        errors!.confirmarSenha = "faltou confirmar a senha";
        setErrorMessage("confirmarSenha");
      } else if (!data.date) {
        errors!.date = "Faltou a data de aniversario .";
        setErrorMessage("date");
      }

      return errors;
    },
    onSubmit: async (data) => {
      data && show();

      console.log("seus dados: ", data);

      //////Adicionar o que quero/////////
      criarUsuario(data.email, data.senha, data.nome)
        .then((usuarioCriado) => {
          // Aqui você pode lidar com o usuário criado com sucesso
          console.log("Usuário criado com sucesso:", usuarioCriado);

          // Associa uma data de nascimento a um usuario
          criarDataNascimento(data.nome, data.email, data.date)
            .then((dados) => {
              // Após criar tudo, loga o usuário.
              logarUsuario(data.email, data.senha)
                .then((user) => {
                  console.log(
                    `Usuário ${JSON.stringify(user)} logado com sucesso`
                  );
                  navigate("/feed");
                })
                .catch((error) => {
                  console.error(`Erro ao logarr: ${error.message}`);
                });
            })
            .catch((erro) => {
              console.log("Erro ao criar data de nascimento: " + erro);
            });
        })
        .catch((erro) => {
          // Lidar com erros durante a criação do usuário
          console.error("Erro ao criar usuário:", erro);
        });

      //////////////

      await esperarUmSegundo();

      formik.resetForm();
      // window.location.reload();
    },
  });

  const isFormFieldInvalid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error">{formik.errors[name]}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  return (
    <CadastroScreen>
      <ContainerCadastro>
        <h2>E-lit</h2>
        {/* <p style={{ color: "red", padding: "10px", textAlign: "center" }}>
          {errorMessage}
        </p> */}

        <form action="#" onSubmit={formik.handleSubmit}>
          <div
            className="p-fluid gap-4 container"
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
                  <Toast ref={toast} />
                  <InputText
                    id="nome"
                    name="nome"
                    placeholder="Nome"
                    value={formik.values.nome}
                    onChange={(e) => {
                      formik.setFieldValue("nome", e.target.value);
                    }}
                    className={classNames({
                      "p-invalid": isFormFieldInvalid("nome"),
                    })}
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
                    name="senha"
                    placeholder="Senha"
                    value={formik.values.senha}
                    onChange={(e) => {
                      formik.setFieldValue("senha", e.target.value);
                    }}
                    className={classNames({
                      "p-invalid": isFormFieldInvalid("senha"),
                    })}
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
                    name="confirmarSenha"
                    placeholder="Confirmar Senha"
                    value={formik.values.confirmarSenha}
                    onChange={(e) => {
                      formik.setFieldValue("confirmarSenha", e.target.value);
                    }}
                    className={classNames({
                      "p-invalid": isFormFieldInvalid("confirmarSenha"),
                    })}
                    feedback={false}
                    tabIndex={1}
                  />
                </div>
              </div>
            </div>

            <div className="p-field p-grid  mb-3">
              <div className="p-col-12 p-md-10">
                <Calendar
                  id="dataNascimento"
                  name="dataNascimento"
                  value={formik.values.date}
                  onChange={(e) => {
                    formik.setFieldValue("date", e.value);
                  }}
                  className={classNames({
                    "p-invalid": isFormFieldInvalid("date"),
                  })}
                  /* onChange={(e) => {
                    console.log(
                      `Dia de nascimento: ${e.value!.getDate().toString()}/${
                        parseInt(e.value!.getMonth().toString()) + 1
                      }/${e.value!.getFullYear().toString()}`
                    );
                    setDate(e.value);

                    console.log("Testando seu mês: " + e.value);
                  }} */
                  showIcon
                />
                {getFormErrorMessage(errorMessage)}
              </div>
            </div>

            <div className="p-col-12">
              <Button type="submit" label="Cadastrar" className="p-mt-3" />
            </div>
          </div>
        </form>
      </ContainerCadastro>
    </CadastroScreen>
  );
};

export default Cadastro;
