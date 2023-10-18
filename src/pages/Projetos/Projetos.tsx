import React, { useEffect, useRef, useState } from "react";
import { FeedAppBar, FeedSendButton } from "../Feed/style";
import AppBar from "../../components/AppBar";
import { GridContainer, GridItem, ProjetosFundo } from "./styles";
import {
  getPosts,
  getProjetos,
  storePost,
  storeProject,
} from "../../firebaseConfig";
import { LoginInput } from "../Login/style";
import AddProjetoButton from "../../components/AddProjetoButton";
import ModalProjetos from "../../components/ModalProjetos";
import { useFormik } from "formik";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { Card } from "primereact/card";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";

interface Product {
  nomeProjeto: String;
  autor: String;
  descricao: String;
}

const Projetos = () => {
  const [posts, setPosts] = useState<any>([]);
  const [modalState, setModalState] = useState<boolean>(false);
  const [postsCarrossel, setPostsCarrossel] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState<String>("");

  async function esperarUmSegundo(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500); // 1000 milissegundos = 1 segundo
    });
  }

  // FORMIKS////////////////////////////////

  const toast = useRef<any>(null);
  const [visible, setVisible] = useState(false);

  type FormikTouchedKeys = {
    value?: string;
    descricao?: string;
  };

  type FormikTouchedKeys2 = {
    value: string;
    descricao: string;
  };

  const show = () => {
    toast.current!.show({
      severity: "success",
      summary: "Projeto Salvo",
      detail: `Projeto ${formik.values.value}`,
    });
  };

  const formik = useFormik<FormikTouchedKeys2>({
    initialValues: {
      value: "",
      descricao: "",
    },
    validate: (data) => {
      let errors: FormikTouchedKeys = {};

      if (!data.value) {
        errors!.value = "Name - Surname is required.";

        setErrorMessage("value");
      } else if (!data.descricao) {
        errors!.descricao = "descricao - descricao is required.";
        setErrorMessage("descricao");
      }

      return errors;
    },
    onSubmit: async (data) => {
      data && show();

      console.log("seus dados: ", data);

      //////Adicionar o que quero/////////
      storeProject(data.value, data.descricao);
      //////////////

      await esperarUmSegundo();

      formik.resetForm();
      setVisible(false);
      // window.location.reload();
    },
  });

  type FormikTouchedKeys3 = "value" | "descricao";

  const isFormFieldInvalid = (name: FormikTouchedKeys3) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name: FormikTouchedKeys3) => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error">{formik.errors[name]}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  // CARROSSEL/////////
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

  const headerCard = (
    <img
      alt="Card"
      src="https://primefaces.org/cdn/primereact/images/usercard.png"
    />
  );

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
            // footer={footerCard}
            header={headerCard}
            className="md:w-25rem"
          >
            <p className="m-0">{product.descricao}</p>
            <div className="mt-3">
              <Button size="large" icon="pi pi-file-edit" rounded />
              <Button
                size="large"
                icon="pi pi-trash"
                rounded
                severity="danger"
              />
            </div>
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
          Meus projetos
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
            {/* <img
              alt="Card"
              src="https://primefaces.org/cdn/primereact/images/usercard.png"
            /> */}
            <div className="text-1xl font-bold descricao">
              {product.descricao}
            </div>
          </div>
          <div className="flex align-items-center justify-conteFnt-between">
            <span className="text-2l font-semibold autor">{product.autor}</span>
            <div className="mt-3 botao">
              <Button
                className="p-button-rounded botoes mr-2"
                icon="pi pi-file-edit"
              />
              <Button
                className="p-button-rounded botoes"
                icon="pi pi-trash"
                severity="danger"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const receberPosts = () => {
      getProjetos().then((strings: any) => {
        setPosts(strings);
        let lista: [] = strings.filter(
          (product: Product) =>
            product.autor === localStorage.getItem("usuario")
        );
        setPostsCarrossel(strings.slice(0, lista.length));
        setFilteredProducts(
          strings
            .filter(
              (product: Product) =>
                product.autor === localStorage.getItem("usuario")
            )
            .slice(0, lista.length)
        );
      });
    };
    receberPosts();
    console.log("Estou atualizando muito?");
  }, [visible]);

  return (
    <ProjetosFundo>
      <AppBar />

      <DataView
        className=""
        value={filteredProducts}
        itemTemplate={itemTemplate}
        layout={"grid"}
        header={header()}
      />

      {/* <Carousel
        value={filteredProducts}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
        numVisible={3}
        numScroll={1}
        circular
        autoplayInterval={3000}
      /> */}
      <Dialog
        header="Cadastro de projeto"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="card flex justify-content-center">
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-column gap-2"
          >
            {/* <p>Nome do Projeto: </p> */}
            <span className="p-float-label mt-5">
              <Toast ref={toast} />
              <InputText
                id="value"
                name="value"
                value={formik.values.value}
                onChange={(e) => {
                  formik.setFieldValue("value", e.target.value);
                }}
                className={classNames({
                  "p-invalid": isFormFieldInvalid("value"),
                })}
              />
              <label>Nome do Projeto</label>
            </span>

            <span className="p-float-label mt-5">
              <InputTextarea
                rows={5}
                cols={30}
                id="descricao" // Use o nome do campo definido no initialValues
                name="descricao" // Use o nome do campo definido no initialValues
                value={formik.values.descricao}
                onChange={(e) => {
                  formik.setFieldValue("descricao", e.target.value);
                }}
                className={classNames({
                  "p-invalid": isFormFieldInvalid("descricao"),
                })}
              />
              <label>descricao</label>{" "}
              {/* Use o nome do campo definido no initialValues */}
            </span>

            {getFormErrorMessage(errorMessage as FormikTouchedKeys3)}
            <Button type="submit" label="Salvar projeto" />
          </form>
        </div>
      </Dialog>

      <AddProjetoButton onClick={() => setVisible(true)}></AddProjetoButton>
    </ProjetosFundo>
  );
};

export default Projetos;
