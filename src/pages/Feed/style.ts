import styled from "styled-components";

export const FeedFundo = styled.div`
    height: 100vh;
    width: 100vw;

    background-color: white;
    align-items: center;

    padding-top: 50px;

    display: flex;
    flex-direction: column;
    align-items: center;

`

export const FeedAppBar = styled.div`
    height: 60px;
    width: 100%;

    background-color: #22e922;

    position: absolute;
    top: 0;

    box-sizing: border-box;

    display: flex;
    /* flex-direction: column; */
    align-items: center;
    justify-content: center;

    /* border: 2px solid red; */

    h2 {
        margin-left: 70px;
    }
`

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
`

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
`

export const ButtonSair = styled.button`
    height: 40px;
    width: 70px;

    /* margin-left: auto; */
    /* align-self: flex-end; */
    justify-self: flex-end;
    margin-left: 20px;

    border-radius: 8px;
    border: 1px solid black;
    /* border: 0; */

    background-color: transparent;

    font-size: 18px;
    font-weight: 500;
`