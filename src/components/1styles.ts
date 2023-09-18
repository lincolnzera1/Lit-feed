import styled from "styled-components";

export const AddProjeto = styled.button`
  height: 50px;
  width: 50px;

  border-radius: 50%;

  background-color: #22e922;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 20px;
  right: 20px;

  font-size: 36px;
  font-weight: bold;

  outline: none;
  border: 0;

  cursor: pointer;
`;

export const ModalProjetosStyle = styled.div`
  position: absolute;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 

  height: 70vh;
  width: 500px;

  opacity: 1;
  border-radius: 10px;

  padding: 20px;

  background-color: white;

  font-size: 16px;
  color: black;

  .linha {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
  }

  textarea {
    min-height: 250px; 
    width: 100%;

    padding: 5px;

    font-size: 14px;
  }

  p {
    margin-top: 10px;
  }
`;

export const InputProjetos = styled.input`
    width: 200px;
    height: 30px;

    padding: 5px;

    border-radius: 5px;
    border: 1px solid black;

    /* margin-left: 10px; */
`



export const FundoBlack = styled.div`
  background-color: rgba(0,0,0,0.2);

  /* opacity: 0.3; */

  position: absolute;
  height: 100%;
  width: 100%;

  overflow: hidden;
`;

export const CloseButtonStyle = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;

  h1 {
    cursor: pointer;
  }
`

// Estilos para o botão do menu
export const MenuButton = styled.button`
  cursor: pointer;
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
`;

// Estilos para o menu de opções
export const MenuOptions = styled.ul`
  list-style-type: none;
  padding: 0;
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? 'block' : 'none')};
  position: absolute;

  
`;

export const MenuItem = styled.li`
  margin: 5px 0;
  `;

export const MenuLink = styled.a`
  text-decoration: none;
  color: #333;
  &:hover {
    text-decoration: underline;
  }
`;
