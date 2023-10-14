import { useEffect, useState } from "react";
import { FeedFundo } from "./style";

// Material ui
import {
  getProjetos,
  listenStrings,
  storage,
  storeProject,
} from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

import { useRef } from "react";
import { ref, uploadBytes } from "firebase/storage";
import AppBar from "../../components/AppBar";
import { GridContainer, GridItem } from "../Projetos/styles";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import items from "../../components/Menu/Menu";
import getItems from "../../components/Menu/Menu";
import { Carousel } from "primereact/carousel";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import "./carousel.css";
import { Toast } from "primereact/toast";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { InputTextarea } from "primereact/inputtextarea";

import { Ripple } from "primereact/ripple";
import { Card } from "primereact/card";

import Lit from "../../assets/lit.png";

interface Mensagem {
  id: string;
  value: string;
}

interface Product {
  nomeProjeto: String;
  autor: String;
  descricao: String;
}

const Feed = () => {
  let navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [postsCarrossel, setPostsCarrossel] = useState<Product[]>([]);
  const [unsubscribe, setUnsubscribe] = useState<() => void>(() => {});
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);

  const [visible, setVisible] = useState(false);

  const items = getItems();

  /* useEffect(() => {
    const unsubscribeFunc = listenStrings(setStrings);
    setUnsubscribe(() => unsubscribeFunc);
  }, []);

  function handleStopListening() {
    unsubscribe();
  } */

  useEffect(() => {
    const receberPosts = () => {
      getProjetos().then((strings: any) => {
        console.log("As strings foram: " + JSON.stringify(strings));
        setPosts(strings);
        let lista: [] = strings;
        setPostsCarrossel(strings.slice(0, lista.length));
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

  // CAROUSSEL

  const responsiveOptions = [
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "991px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const [products, setProducts] = useState<Product[]>([]);

  // CARD

  const headerCard = (
    <img
      alt="Card"
      src="https://primefaces.org/cdn/primereact/images/usercard.png"
    />
  );
  const footerCard = (
    <>
      {/* <Button size="small" label="Like" icon="pi pi-check" />
      <Button
      size="small"
        label="Cancel"
        severity="secondary"
        icon="pi pi-times"
        style={{ marginLeft: "0.5em" }}
      /> */}
    </>
  );

  useEffect(() => {}, []);

  const productTemplate = (product: Product) => {
    return (
      <div
        style={{
          minHeight: 250,
        }}
        className="border-3 surface-border border-round m-2 text-center py-5 px-3 testando"
      >
        <div className="card flex justify-content-center">
          <Card
            title={product.nomeProjeto}
            subTitle={product.autor}
            footer={footerCard}
            header={headerCard}
            className="md:w-25rem"
          >
            {/* <h2 className="mb-2">{product.nomeProjeto}</h2> */}
            {/* <h4 className="mt-0 mb-3">{product.descricao}</h4> */}
            <p className="m-0">
              {product.descricao}
            </p>
            {/* <Tag value={product.nomeProjeto} severity={getSeverity(product)}></Tag> */}
            
          </Card>
        </div>
      </div>
    );
  };

  return (
    <FeedFundo>
      {/* <Menubar model={items} start={start} end={end} /> */}
      <AppBar />
      <Carousel
        value={postsCarrossel}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
        numVisible={3}
        numScroll={1}
        circular
        autoplayInterval={3000}
      />

      {/* <p>{JSON.stringify(postsCarrossel)}</p> */}
      {/* <GridContainer>
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
        </GridContainer> */}
    </FeedFundo>
  );
};

export default Feed;
