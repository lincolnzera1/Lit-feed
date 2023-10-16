import styled from "@emotion/styled";

export const ProjetosFundo = styled.div`
  background-color: lightyellow;
  height: 100vh;
  /* width: 100vw; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */

  position: relative;

  .item-do-dataview {
    min-height: 100%;
    /* max-height: 30px; */

    position: relative;
  }

  .descricao {
    max-height: 150px;
    overflow: auto;

    /* background-color: red; */
  }

  .botao {
    position: absolute;
    right: 20px;
    bottom: 15px;

    display: flex;

    
  }

  .botoes {
    height: 35px;
    width: 35px;

  }

  .autor {
    position: absolute;
    left: 24px;
    bottom: 18px;
  }
`;

export const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;

  /* overflow-y: scroll; */

  padding: 100px;

  background-color: lightyellow;
`;

export const GridItem = styled.div`
  width: 30%;
  height: 300px;

  min-width: 300px;

  @media (max-width: 1025px) {
    width: 40%;
  }

  overflow: auto;

  /* Estilize suas divs aqui */
  background-color: #f0f0f0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;

  margin: 10px;

  h2 {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;
