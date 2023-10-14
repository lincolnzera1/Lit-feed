import styled from "styled-components";

export const CadastroScreen = styled.div`
    background-color: #DFFFD0;
    height: 100vh;
    width: 100vw;

    display: flex;
    align-items: center;
    justify-content: center;

`

export const ContainerCadastro = styled.div`
    height: 80%;
    width: 80%;

    position: relative;

    background-color: white;

    border-width: 2px;
    border-style: solid;
    border-image: linear-gradient(to right, red, #4CAF50);
    border-image-slice: 1;
    border-radius: 10px;
    padding: 10px;
    background-color: #ffffff; /* Cor de fundo, ajuste conforme necessário */
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .container {

       @media (max-width: 800px) {
        max-width: 350px;
       }

       @media (max-width: 530px) {
        max-width: 280px;
       }

       @media (max-width: 370px) {
        max-width: 250px;
       }
    }

    h2 {
        /* margin-bottom: 120px; */
        color: black;
        font-size: 35px;

        position: absolute;
        top: 0;

        font-weight: bold;
        text-transform: 2px black;
    }
`