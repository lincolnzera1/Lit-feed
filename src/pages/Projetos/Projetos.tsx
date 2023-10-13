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

  useEffect(() => {
    const receberPosts = () => {
      getProjetos().then((strings: any) => {
        setPosts(strings);
        let lista: [] = strings;
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
  }, []);

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

  const show = () => {
    toast.current!.show({
      severity: "success",
      summary: "Projeto Salvo",
      detail: `Projeto ${formik.values.value}`,
    });
  };

  const formik = useFormik({
    initialValues: {
      value: "",
      descricao: "",
    },
    validate: (data) => {
      let errors;

      if (!data.value) {
        errors!.value = "Name - Surname is required.";
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
      window.location.reload();
    },
  });

  type FormikTouchedKeys = keyof {
    value: string;
    descricao: string;
  };
  const isFormFieldInvalid = (name: FormikTouchedKeys) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name: FormikTouchedKeys) => {
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
  const productTemplate = (product: Product) => {
    return (
      <div
        style={{
          minHeight: 250,
        }}
        className="border-3 surface-border border-round m-2 text-center py-5 px-3 testando"
      >
        {product.autor === localStorage.getItem("usuario") ? (
          <div>
            <h2 className="mb-2">{product.autor}</h2>
            <h4 className="mt-0 mb-3">{product.descricao}</h4>
            {/* <Tag value={product.nomeProjeto} severity={getSeverity(product)}></Tag> */}
            <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
              <Button size="large" icon="pi pi-file-edit" rounded />
              <Button
                size="large"
                icon="pi pi-trash"
                rounded
                severity="danger"
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <ProjetosFundo>
      <AppBar />

      <Carousel
        value={filteredProducts}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
        numVisible={3}
        numScroll={1}
        circular
        autoplayInterval={3000}
      />
      {/* <GridContainer>
        {posts.map((item: any, index: any) =>
          item.autor === localStorage.getItem("usuario") ? (
            <GridItem key={index}>
              <div>
                <h2>
                  {item.nomeProjeto} - {item.autor}
                </h2>
                <p>{item.descricao}</p>
              </div>
            </GridItem>
          ) : null
        )}
      </GridContainer> */}
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
              <label htmlFor="descricao">descricao</label>{" "}
              {/* Use o nome do campo definido no initialValues */}
            </span>

            {getFormErrorMessage("value")}
            <Button type="submit" label="Salvar projeto" />
          </form>
        </div>
      </Dialog>

      <AddProjetoButton onClick={() => setVisible(true)}></AddProjetoButton>
    </ProjetosFundo>
  );
};

export default Projetos;
