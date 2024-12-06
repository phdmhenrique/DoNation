import { useState } from "react";
import PhotoUser from "../../Assets/photo-people-00.jpg";
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

function NavAccount() {
  // Defina o estado inicial para o índice do link "Grupos" (índice 4)
  const [activeIndex, setActiveIndex] = useState(4);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const links = [
    { icon: <HouseIcon />, label: "Home" },
    { icon: <NotificationIcon />, label: "Notifications" },
    { icon: <MessageIcon />, label: "Messages" },
    { icon: <FavoriteIcon />, label: "Favorites" },
    { icon: <GroupIcon />, label: "Groups" },
    { icon: <UserDonationIcon />, label: "Donations" },
    { icon: <CardIcon />, label: "New Donation" },
    { icon: <UserIcon />, label: "My Profile" },
    { icon: <MoreInfoIcon />, label: "More" },
  ];
  
  return (
    <Container>
      <PhotoUserImage>
        <img src={PhotoUser} alt="Foto de usuário" />
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
