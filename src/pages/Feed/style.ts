import styled from "styled-components";

export const FeedFundo = styled.div`
  height: 100vh;
  width: 100vw;

  background-color: white;
  align-items: center;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FeedAppBar = styled.div`
  height: 60px;
  width: 100vw;

  background-color: #22e922;


  display: grid;
  grid-template-columns: 33% 33% 33%;
  align-items: center;

  box-sizing: border-box;

  /* border: 2px solid red; */

  h2 {
    position: absolute;
    left: 10px;

    text-align: center;
  }
`;

export const FeedMensagens = styled.div`
  height: 60%;
  width: 80%;

  margin-top: 50px;

  border: 1px solid black;

  overflow: auto;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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


export const DivBotoes = styled.div`
  position: absolute;
  right: 150px
`