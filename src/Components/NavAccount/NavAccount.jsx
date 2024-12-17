import { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext.jsx";
import { Link } from "react-router-dom";
import {
  Container,
  PhotoUserImage,
  NavListLinks,
  NavLink,
} from "./NavAccount.js";

// ICONS
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

  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const links = [
    { icon: <GroupIcon />, label: "Home", to: "/home" },
    { icon: <NotificationIcon />, label: "Notificações" },
    { icon: <MessageIcon />, label: "Mensagens" },
    { icon: <FavoriteIcon />, label: "Favoritos" },
    { icon: <UserDonationIcon />, label: "Doações" },
    { icon: <CardIcon />, label: "Nova Doação" },
    { icon: <UserIcon />, label: "Meu Perfil", to: "/home/profile" },
    { icon: <MoreInfoIcon />, label: "Mais" },
  ];

  const imageUrl = getUserImageUrl(user?.userImage);

  return (
    <Container>
      <Link to="/home/profile">
        <PhotoUserImage>
          <img src={imageUrl} alt={user?.name || "Foto de usuário"} />
        </PhotoUserImage>
      </Link>
      <NavListLinks>
        {links.map((link, index) => (
          <Link key={index} to={link.to}>
            <NavLink
              active={index === activeIndex ? 1 : 0}
              onClick={() => handleClick(index)}
            >
              {link.icon}
              {link.label}
            </NavLink>
          </Link>
        ))}
      </NavListLinks>
    </Container>
  );
}

export default NavAccount;
