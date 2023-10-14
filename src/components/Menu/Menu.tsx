import { useNavigate } from "react-router-dom";

// No arquivo onde você define a variável 'items'
const getItems = () => {
  const navigate = useNavigate(); // Chame o hook dentro de um componente funcional

  const items = [
    {
      label: "Projetos do lit",
      icon: "pi pi-fw pi-briefcase",
      command: () => navigate("/feed"),
    },
    {
      label: "Meus projetos",
      icon: "pi pi-fw pi-pencil",
      command: () => navigate("/projetos"),
    },
    {
      label: "Aniversariantes do mês",
      icon: "pi pi-fw pi-user",
    },
    // {
    //   label: "Events",
    //   icon: "pi pi-fw pi-calendar",
    // },
    // {
    //   label: "Quit",
    //   icon: "pi pi-fw pi-power-off",
    // },
  ];

  return items;
};

export default getItems;
