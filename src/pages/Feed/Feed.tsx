import { useEffect, useState } from "react";
import {
  FeedFundo,
} from "./style";


// Material ui
import {
  getProjetos,
  listenStrings,
  storage,
} from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

import { useRef } from "react";
import { ref, uploadBytes } from "firebase/storage";
import AppBar from "../../components/AppBar";
import { GridContainer, GridItem } from "../Projetos/styles";

interface Mensagem {
  id: string;
  value: string;
}

const Feed = () => {
  let navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [mensagem, setMensagem] = useState("");

  const [strings, setStrings] = useState<any>([]);
  const [unsubscribe, setUnsubscribe] = useState<() => void>(() => {});
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);

  useEffect(() => {
    const unsubscribeFunc = listenStrings(setStrings);
    setUnsubscribe(() => unsubscribeFunc);
  }, []);

  function handleStopListening() {
    unsubscribe();
  }

  useEffect(() => {
    const receberPosts = () => {
      getProjetos().then((strings: any) => {
        // console.log("As strings foram: " + JSON.stringify(strings))
        setPosts(strings);
      });
    };
    receberPosts();
  }, []);

  const fileInputRef = useRef<any>();

  const handleUpload = async () => {
    const file = fileInputRef.current.files[0];

    if (!file) {
      console.log("Nenhum arquivo selecionado.");
      return;
    }

    try {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      console.log("Upload bem-sucedido!");
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
    }
  };

  return (
    <FeedFundo>
      <AppBar />
      <GridContainer>
        {posts.map((item: any, index: any) => (
          <GridItem key={index}>
            <div>
              <h2>
                {item.nomeProjeto} - {item.autor}
              </h2>
              <p>{item.descricao}</p>
            </div>
          </GridItem>
        ))}
      </GridContainer>
    </FeedFundo>
  );
};

export default Feed;
