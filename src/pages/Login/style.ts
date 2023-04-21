import styled from "styled-components";

export const LoginScreen = styled.div`
    position: relative;

    background-color: #22e922;    
    height: 100vh;
    width: 100vw;

    display: flex;
    align-items: flex-start;
    justify-content: center;

    padding-top: 80px;

    @media screen and (max-height: 560px){
        padding-top: 30px;
    }


`

export const ContainerBrancoLogin = styled.div`
    height: 55%;
    width: 100%;

    background-color: white;

    border-top-left-radius: 80px;
    border-top-right-radius: 80px;

    position: absolute;
    bottom: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    padding-top: 60px;

    p {
        margin-top: 20px;
    }
`

export const LogoLit = styled.img`

    padding-left: 25px;


    @media screen and (max-height: 560px){
        padding-bottom: 200px;
        margin-bottom: 300px;
    }
`

export const LoginInput = styled.input`
    min-height: 50px;
    width: 80%;

    border: 1px solid lightgray;
    border-radius: 8px;

    padding-left: 20px;
    margin-top: 20px;

    font-size: 18px;
    color: black;

    ::placeholder {
        
    }
`

export const LoginButton = styled.button`
    background-color: #22e922;

    position: relative;

    width: 80%;
    min-height: 50px;

    text-align: center;
    font-size: 22px;
    color: black;
    font-weight: bold;

    border: 2px solid black;
    border-radius: 8px;

    margin-top: 40px;
`

export const SpanLogin = styled.span`
    color: #22e922;
    font-size: 18px;
`