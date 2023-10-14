import styled from "styled-components";

export const FeedFundo = styled.div`

  height: 100vh;
  width: 100vw;

  margin: 0 !important;
  padding: 0 !important;

  background-color: lightyellow;

  display: flex;
  flex-direction: column;
  justify-content: center;

  /* overflow: scroll; */

  header {
  }
`;

export const FeedAppBar = styled.div`
  height: 60px;
  width: 100vw;

  position: relative;

  background-color: #22e922;

  display: grid;
  grid-template-columns: 33% 33% 33%;
  align-items: center;

  box-sizing: border-box;

  overflow: hidden;

  /* border: 2px solid red; */

  h2 {
    cursor: pointer;
  }
`;


export const FeedSendButton = styled.button`
  height: 50px;
  width: 90px;

  background-color: #22e922;
  color: black;
  font-size: 18px;
  font-weight: 500;

  margin-top: 15px;

  text-align: center;

  border: 2px solid black;
`;

export const ButtonSair = styled.button`
  height: 40px;

  padding: 10px 20px;
  box-sizing: border-box;

  /* margin-left: auto; */
  /* align-self: flex-end; */
  position: absolute;
  right: 10px;

  border-radius: 8px;
  border: 1px solid black;
  /* border: 0; */

  background-color: transparent;

  font-size: 18px;
  font-weight: 500;

  cursor: pointer;

  &:hover {
    background-color: #33ff33; /* Cor de fundo no hover */
  }

  @media (max-width: 700px) {
    visibility: hidden;
  }
`;

export const BotaoPadrao = styled.button`
  height: 40px;

  font-size: 16px;
  font-weight: 500;

  padding: 5px 5px;
  box-sizing: border-box;

  margin-left: 20px;
  /* align-self: flex-end; */

  border-radius: 8px;
  border: 1px solid black;
  /* border: 0; */

  background-color: transparent;

  cursor: pointer;

  &:hover {
    background-color: #33ff33; /* Cor de fundo no hover */
  }
`;

export const BotaoPadraoMobile = styled.button`
  height: 40px;

  font-size: 16px;
  font-weight: 500;

  padding: 5px 5px;
  box-sizing: border-box;

  margin-left: 20px;
  /* align-self: flex-end; */

  border-radius: 8px;
  border: 1px solid black;
  /* border: 0; */

  background-color: transparent;

  cursor: pointer;

  &:hover {
    background-color: #33ff33; /* Cor de fundo no hover */
  }
  

  @media (min-width: 700px) {
    visibility: hidden;
  }
  
`;

export const DivBotoes = styled.div`
  position: absolute;
  right: 150px;

  @media (max-width: 700px) {
    visibility: hidden;
  }
`;
