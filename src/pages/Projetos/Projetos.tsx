import React, { useEffect, useState } from "react";
import { FeedAppBar, FeedSendButton } from "../Feed/style";
import AppBar from "../../components/AppBar";
import { GridContainer, GridItem, ProjetosFundo } from "./styles";
import { getPosts, getProjetos, storePost } from "../../firebaseConfig";
import { LoginInput } from "../Login/style";
import AddProjetoButton from "../../components/AddProjetoButton";
import ModalProjetos from "../../components/ModalProjetos";

const Projetos = () => {
  const items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
  ];
  const [posts, setPosts] = useState<any>([]);
  const [mensagem, setMensagem] = useState<string>("");
  const [modalState, setModalState] = useState<boolean>(false);
  useEffect(() => {
    const receberPosts = () => {
      getProjetos().then((strings: any) => {
        // console.log("As strings foram: " + JSON.stringify(strings))
        setPosts(strings);
      });
    };
    receberPosts();
  }, []);

  const handleCloseModal = () => {
    setModalState(!modalState);
  };

  const handleCloseModalAtualizar = () => {
    setModalState(!modalState);
    window.location.reload();
  };

  return (
    <ProjetosFundo style={{ width: "100vw", height: "100vh" }}>
      {modalState ? (
        <ModalProjetos
          onCloseAtualizar={handleCloseModalAtualizar}
          onClose={handleCloseModal}
        />
      ) : null}
      <AppBar />
      <GridContainer>
        {posts.map((item: any, index: any) =>
          item.autor === localStorage.getItem("usuario") ? (
            <GridItem key={index}>
              <div>
                <h2>{item.nomeProjeto} - {item.autor}</h2>
                <p>{item.descricao}</p>
              </div>
            </GridItem>
          ) : null
        )}
        
      </GridContainer>
      <AddProjetoButton onClick={handleCloseModal}></AddProjetoButton>
    </ProjetosFundo>
  );
};

export default Projetos;
