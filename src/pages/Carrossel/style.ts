import styled from "styled-components";

export const ContainerTrofeus = styled.div`
    height: 300px;
    width: 100%;


    background-color: white;

    display: flex;
    flex-direction: column;
    /* align-items: flex-start; */
    /* justify-content: start; */

    border: 2px solid red;

    margin: 0 10px 0 10px;

    h3 {
        margin-top: auto;
    }

    h4 {
        margin-top: 20px;
        margin-bottom: 40px;
    }
`

export const ContainerItem = styled.div`
    border: 2px solid black;
    height: 70px;
    width: 50%;
    box-sizing: border-box;
    /* padding: 80px; */

    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;

`