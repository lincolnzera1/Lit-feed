import React, { useState } from "react";
import { FundoBlack, InputProjetos, ModalProjetosStyle } from "./1styles";
import { BotaoPadrao } from "../pages/Feed/style";
import { storeProject } from "../firebaseConfig";
import CloseButton from "./CloseButton";

interface modal {
  onClose: () => void;
  onCloseAtualizar: () => void
}

const ModalProjetos = (props: modal) => {
  const [nomeProjeto, setNomeProjeto] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [erro, setErro] = useState("");
  return (
    <FundoBlack>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          if (nomeProjeto === "") {
            setErro("Nome do projeto obrigatório.");
          } else {
            storeProject(nomeProjeto, descricao);
            setNomeProjeto("");
            setDescricao("");
            props.onCloseAtualizar();
          }
        }}
      >
        <ModalProjetosStyle>
          <CloseButton onClick={props.onClose} />
          <div className="linha">
            <p>Nome do projeto</p>
            <InputProjetos
              value={nomeProjeto}
              onChange={(e) => setNomeProjeto(e.target.value)}
            />
          </div>
          <div className="linha-textarea">
            <p>Descrição do projeto:</p>
            <textarea
              onChange={(e) => setDescricao(e.target.value)}
              name="descricao"
              value={descricao}
            ></textarea>
          </div>
          <BotaoPadrao
            type="submit"
            style={{
              marginLeft: "360px",
              minWidth: "100px",
            }}
          >
            Salvar
          </BotaoPadrao>
          <p>{erro}</p>
        </ModalProjetosStyle>
      </form>
    </FundoBlack>
  );
};

export default ModalProjetos;
