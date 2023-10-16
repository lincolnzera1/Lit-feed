import { useEffect, useState } from "react";
import { FeedFundo } from "./style";

// Material ui
import { getProjetos, storage } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

import { useRef } from "react";
import { ref, uploadBytes } from "firebase/storage";
import AppBar from "../../components/AppBar";
import getItems from "../../components/Menu/Menu";
import { Carousel } from "primereact/carousel";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";

import "./carousel.css";

import { Card } from "primereact/card";
import { Button } from "primereact/button";

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
            <p className="m-0">{product.descricao}</p>
            {/* <Tag value={product.nomeProjeto} severity={getSeverity(product)}></Tag> */}
          </Card>
        </div>
      </div>
    );
  };

  // GRID TEMPLATE

  const [layout, setlayout] = useState("");

  const header = () => {
    return (
      <div className="flex justify-content-center fz-2">
        <p
          style={{
            fontSize: "2rem",
          }}
        >
          Nossos projetos
        </p>
      </div>
    );
  };

  const itemTemplate = (product: Product, layout: any) => {
    if (!product) {
      return;
    }

    if (layout === "grid") return gridItem(product);
  };

  const gridItem = (product: Product) => {
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2 ">
        <div className="p-4 border-1 surface-border surface-card border-round item-do-dataview">
          <div className="flex flex-wrap align-items-center justify-content-between gap-2 ">
            <div className="flex align-items-center gap-2">
              <i className="pi pi-briefcase"></i>
              <span className="font-semibold">{product.nomeProjeto}</span>
            </div>
          </div>
          <div className="flex flex-column align-items-center gap-3 py-5">
            <img
              alt="Card"
              src="https://primefaces.org/cdn/primereact/images/usercard.png"
            />
            <div className="text-1xl font-bold descricao">
              {product.descricao}
            </div>
          </div>
          <div className="flex align-items-center justify-conteFnt-between">
            <span className="text-2l font-semibold autor">
              ${product.autor}
            </span>
            <Button
              icon="pi pi-heart"
              className="p-button-rounded botao"
              // disabled={product.inventoryStatus === "OUTOFSTOCK"}
            ></Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <FeedFundo>
      {/* <Menubar model={items} start={start} end={end} /> */}
      <AppBar />
      {/* <Carousel
        value={postsCarrossel}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
        numVisible={3}
        numScroll={1}
        circular
        autoplayInterval={3000}
      /> */}

      <DataView
        className=""
        value={postsCarrossel}
        itemTemplate={itemTemplate}
        layout={"grid"}
        header={header()}
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
