import { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext.jsx";
import {
  Container,
  PhotoUserImage,
  NavListLinks,
  NavLink,
} from "./NavAccount.js";

// ICONS
import HouseIcon from "../../Icons/HouseIcon.jsx";
import NotificationIcon from "../../Icons/NotificationIcon.jsx";
import MessageIcon from "../../Icons/MessageIcon.jsx";
import FavoriteIcon from "../../Icons/FavoriteIcon.jsx";
import GroupIcon from "../../Icons/GroupIcon.jsx";
import UserDonationIcon from "../../Icons/UserDonationIcon.jsx";
import CardIcon from "../../Icons/CardIcon.jsx";
import UserIcon from "../../Icons/UserIcon.jsx";
import MoreInfoIcon from "../../Icons/MoreInfoIcon.jsx";
import { getUserImageUrl } from "../../api/axiosConfig.js";

function NavAccount() {
  const { user } = useAuth();

  // Defina o estado inicial para o índice do link "Grupos" (índice 4)
  const [activeIndex, setActiveIndex] = useState(4);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const links = [
    { icon: <HouseIcon />, label: "Home" },
    { icon: <NotificationIcon />, label: "Notificações" },
    { icon: <MessageIcon />, label: "Mensagens" },
    { icon: <FavoriteIcon />, label: "Favoritos" },
    { icon: <GroupIcon />, label: "Grupos" },
    { icon: <UserDonationIcon />, label: "Doações" },
    { icon: <CardIcon />, label: "Nova Doação" },
    { icon: <UserIcon />, label: "Meu Perfil" },
    { icon: <MoreInfoIcon />, label: "Mais" },
  ];

  const imageUrl = getUserImageUrl(user?.profileImage)

  return (
    <Container>
      <PhotoUserImage>
        <img src={imageUrl} alt={user?.name || "Foto de usuário"} />
      </PhotoUserImage>
      <NavListLinks>
        {links.map((link, index) => (
          <NavLink
            key={index}
            active={index === activeIndex ? 1 : 0}
            onClick={() => handleClick(index)}
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </NavListLinks>
    </Container>
  );
}

export default NavAccount;
