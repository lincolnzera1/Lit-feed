import React, { useEffect, useState } from "react";
import { FeedAppBar, FeedSendButton } from "../Feed/style";
import AppBar from "../../components/AppBar";
import { GridContainer, GridItem, ProjetosFundo } from "./styles";
import { getPosts, storePost } from "../../firebaseConfig";
import { LoginInput } from "../Login/style";

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
  const [mensagem, setMensagem] = useState("");
  useEffect(() => {
    const receberPosts = () => {
      getPosts().then((strings: any) => {
        // console.log("As strings foram: " + JSON.stringify(strings))
        setPosts(strings);
      });
    };
    receberPosts();
  }, []);

  return (
    <ProjetosFundo style={{ width: "100vw", height: "100vh" }}>
      <AppBar />
      <LoginInput
        onChange={(e: any) => setMensagem(e.target.value)}
        placeholder="Envie uma mensagem..."
      />
      <FeedSendButton
        onClick={() => {
          storePost(mensagem);
          // writeUserData(mensagem);
        }}
      >
        Enviar
      </FeedSendButton>
      <GridContainer>
        {posts.map((item: any, index: any) =>
          item.autor === localStorage.getItem("usuario") ? (
            <GridItem key={index}>
              <div>
                <h2>{item.autor}</h2>
                <p>{item.post}</p>
              </div>
            </GridItem>
          ) : null
        )}
      </GridContainer>
    </ProjetosFundo>
  );
};

export default Projetos;
