import React, { useEffect, useState } from "react";
import AppBar from "../../components/AppBar";
import { DataView } from "primereact/dataview";
import { getDatasDeNascimento, getProjetos } from "../../firebaseConfig";
import { Button } from "primereact/button";
import { Nullable } from "primereact/ts-helpers";

interface Product {
  dataNascimento: {
    nanoseconds: number;
    seconds: number;
  };
  email: String;
  nome: String;
}

const Aniversarios = () => {
  const [postsCarrossel, setPostsCarrossel] = useState<Product[]>([]);

  useEffect(() => {
    const receberPosts = () => {
      getDatasDeNascimento().then((strings: any) => {
        console.log("As strings foram: " + JSON.stringify(strings));
        // setPosts(strings);
        let lista: [] = strings;
        setPostsCarrossel(strings.slice(0, lista.length));
      });
    };
    receberPosts();
  }, []);

  const itemTemplate = (product: Product) => {
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth() + 1; // Janeiro é 0, então adicionamos 1 para obter o mês atual
    const mesAtualFormatado = mesAtual.toString();
    console.log("mes atual ", mesAtual);

    const dataNascimentoEmSegundos = product.dataNascimento.seconds;
    const mesNascimento =
      new Date(dataNascimentoEmSegundos * 1000).getMonth() + 1;
    const mesPessoaFormatado = mesNascimento.toString();

    return (
      <div className="col-12" style={{
        backgroundColor: mesAtualFormatado === mesPessoaFormatado ? "lightgreen" : "white"
      }}>
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{product.nome}</div>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-clock"></i>
                  <span className="font-semibold">
                    {new Date(product.dataNascimento.seconds * 1000)
                      .getDate()
                      .toString()}
                    /{mesPessoaFormatado}/
                    {new Date(product.dataNascimento.seconds * 1000)
                      .getFullYear()
                      .toString()}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">
                {mesAtualFormatado === mesPessoaFormatado ? "FAZ ANIVERSÁRIO ESSE MÊS" : "NÃO"}
              </span>
              {/* <Button
                icon="pi pi-shopping-cart"
                className="p-button-rounded"
              ></Button> */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <AppBar />
      <div className="card">
        <DataView value={postsCarrossel} itemTemplate={itemTemplate} />
      </div>
    </div>
  );
};

export default Aniversarios;
