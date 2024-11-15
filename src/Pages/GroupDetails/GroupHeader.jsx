import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ButtonInviteOrShare,
  ButtonsInviteAndShare,
  ComunityAddress,
  ComunityInformations,
  ComunityInfosAndBack,
  ComunityName,
  ComunityUsername,
  LazyLoadStyled,
  UserPhoto,
} from "./GroupDetails.js";
import { ContainerWrapper, ContainerEditable } from "./GroupHeader.js";
import InterestGroup from '../../Components/InterestGroup/InterestGroup.jsx'

import { FaArrowLeft } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import LocationIcon from "../../Icons/LocationIcon.jsx";
import DefaultAvatar from "../../Assets/default-avatar.png";
import DefaultCover from "../../Assets/default-cover.png";
import { Container } from "@mui/material";

// Definindo o componente `GroupHeader`
const GroupHeader = ({ groupData, isEditable, onChange }) => {
  // Definindo o estado para os dados do grupo
  const [group, setGroup] = useState(
    groupData || {
      comunityTitle: "NomeDaComunidade",
      comunityUsername: "nomedecomunidade",
      comunityAddress: "Endereço da Comunidade",
      comunityBanner: "",
      comunityImage: "",
    }
  );

  const [bioAboutText, setBioAboutText] = useState("");
  const maxBioAboutLength = 250;

  const handleBioAboutChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxBioAboutLength) setBioAboutText(text);
  };

  // Função para atualizar os dados em tempo real
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedGroup = { ...group, [name]: value };
    setGroup(updatedGroup);
    if (onChange) onChange(updatedGroup); // Atualiza no componente pai, se fornecido
  };

  return (
    <ContainerWrapper>
      <LazyLoadStyled height={200} offset={100} once>
        <div className="shadow"></div>

        {isEditable ? (
          <div className="container-register_image">
            <img
              className="register_image"
              src={group?.comunityBanner ? group.comunityBanner : ""}
              alt={group?.comunityBanner ? group.comunityTitle : ""}
            />
          </div>
        ) : (
          <img
            src={group?.comunityBanner ? group.comunityBanner : DefaultCover}
            alt={group.comunityTitle}
          />
        )}

        <UserPhoto>
          <img
            src={group?.comunityImage ? group.comunityImage : DefaultAvatar}
            alt={group?.comunityTitle}
          />
          <ComunityUsername>
            <p>
              {group?.comunityTitle
                ? group.comunityTitle
                : "Nome Da Comunidade"}
            </p>
            <p>@{group?.comunityUsername}</p>
          </ComunityUsername>
        </UserPhoto>

        <ComunityInfosAndBack>
          <Link to="/home">
            <FaArrowLeft />
          </Link>
          <ComunityInformations>
            <ComunityName>
              <p>
                {group?.comunityTitle
                  ? group.comunityTitle
                  : "Nome Da Comunidade"}
              </p>
            </ComunityName>
            <ComunityAddress>
              <LocationIcon />
              {group?.comunityAddress
                ? group.comunityAddress
                : "Endereço da Comunidade"}
            </ComunityAddress>
          </ComunityInformations>
        </ComunityInfosAndBack>

        {/* <ButtonsInviteAndShare>
        <ButtonInviteOrShare>
          <IoMdShare />
          Compartilhar
        </ButtonInviteOrShare>
      </ButtonsInviteAndShare> */}
      </LazyLoadStyled>

      {isEditable ? (
        <ContainerEditable>
          <div className="add-bio-about">
            <label htmlFor="">Adicionar Bio/Sobre</label>
            <div className="textarea-wrapper">
              <textarea
                id="bio"
                name="bio"
                placeholder="Escrever sobre..."
                value={bioAboutText}
                onChange={handleBioAboutChange}
                maxLength={maxBioAboutLength}
              />
              <span className="char-counter">
                {bioAboutText.length}/{maxBioAboutLength}
              </span>
            </div>

            <button>Salvar</button>
          </div>

          <div className="groupname-address">
            <div className="register-group-address">
              <label htmlFor="">Mude o Nome do Grupo</label>
              <input
                type="text"
                name="comunityTitle"
                onChange={handleInputChange}
                // value={group?.comunityTitle}
                maxLength={28}
                minLength={10}
                placeholder="Nome Da Comunidade"
              />
            </div>

            <div className="register-group-address">
              <label htmlFor="">Localidade</label>
              <input
                type="text"
                name="comunityAddress"
                onChange={handleInputChange}
                // value={group?.comunityAddress}
                maxLength={28}
                minLength={10}
                placeholder="Registro, São Paulo"
              />
            </div>
          </div>

          <div className="interest-groups">
            <div className="register-interest-groups">
              {/* <InterestGroup /> */}
            </div>
          </div>
        </ContainerEditable>
      ) : (
        ""
      )}
    </ContainerWrapper>
  );
};

export default GroupHeader;
