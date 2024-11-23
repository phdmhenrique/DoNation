import { Link } from "react-router-dom";
import { useState } from "react";
import { useGroup } from "../../Contexts/GroupContext.jsx";

import {
  ComunityAddress,
  ComunityInformations,
  ComunityInfosAndBack,
  ComunityName,
  ComunityUsername,
  LazyLoadStyled,
  UserPhoto,
} from "./GroupDetails.js";
import {
  ContainerWrapper,
  ContainerEditable,
  ImageContainer,
} from "./GroupHeader.js";

import Button from "../../Components/Button/Button.jsx";
import { FaArrowLeft } from "react-icons/fa";
import EditIcon from "../../Icons/EditIcon.jsx";
import LocationIcon from "../../Icons/LocationIcon.jsx";
import DefaultAvatar from "../../Assets/default-avatar.png";
import DefaultCover from "../../Assets/default-cover.png";
import InterestGroup from "../../Components/InterestGroup/InterestGroup.jsx";

// Definindo o componente `GroupHeader`
const GroupHeader = ({ isEditable, onChange }) => {
  const { registerNewGroup } = useGroup();

  // STATES
  const [groupFormData, setGroupFormData] = useState({
    comunityTitle: "NomeDaComunidade",
    comunityUsername: "nomedecomunidade",
    comunityAddress: "Endereço da Comunidade",
    comunityBanner: null,
    comunityImage: null,
    comunityInterests: [],
  });
  const [isBannerSelected, setIsBannerSelected] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [selectedGroupInterests, setSelectedGroupInterests] = useState(
    groupFormData.comunityInterests || []
  );
  const [bioAboutText, setBioAboutText] = useState("");
  const maxBioAboutLength = 250;

  // FUNÇÕES
  const handleBioAboutChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxBioAboutLength) setBioAboutText(text);
  };

  // Função para atualizar os dados em tempo real
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedGroup = { ...groupFormData, [name]: value };

    if (name === "comunityTitle") {
      const normalizedUsername = value
        .replace(/\s+/g, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase();
      updatedGroup.comunityUsername = normalizedUsername;
    }

    setGroupFormData(updatedGroup);
    if (onChange) onChange(updatedGroup);
  };

  // Atualiza as imagens no estado e fornece pré-visualização
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];

      const previewUrl = URL.createObjectURL(file);

      console.log(file);

      setGroupFormData((prev) => ({
        ...prev,
        [name]: { file, previewUrl },
      }));

      if (name === "comunityBanner") setIsBannerSelected(true);
      if (name === "comunityImage") setIsImageSelected(true);
    }
  };

  const handleGroupSelectionChange = (updatedGroups) => {
    setSelectedGroupInterests(updatedGroups);
    onChange({ ...groupFormData, comunityInterests: updatedGroups });
  };

  // enviar dados cadastrados para a api.
  const handleSubmit = async () => {
    if (
      !groupFormData.comunityTitle ||
      !bioAboutText ||
      !groupFormData.comunityAddress
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Criação de FormData
    const formData = new FormData();
    formData.append("name", groupFormData.comunityTitle);
    formData.append("description", bioAboutText);
    formData.append("address", groupFormData.comunityAddress);

    if (groupFormData.comunityImage?.file) {
      formData.append("groupImage", groupFormData.comunityImage.file); // Avatar
    }
    if (groupFormData.comunityBanner?.file) {
      formData.append("landscapeImage", groupFormData.comunityBanner.file); // Banner
    }

    try {
      const response = await registerNewGroup(formData); // Passando FormData para a API
      console.log("groupHeader -> response:", response);
      alert("Grupo registrado com sucesso.");
    } catch (error) {
      console.error("Erro ao tentar cadastrar novo grupo:", error.message);
    }
  };

  return (
    <ContainerWrapper>
      <LazyLoadStyled height={200} offset={100} once>
        <div className="shadow"></div>

        {isEditable ? (
          <div className="container-register_image">
            <ImageContainer>
              <input
                type="file"
                name="comunityBanner"
                id="comunityBanner"
                accept="image/*"
                className="image-input"
                onChange={handleImageChange}
              />
              <img
                className={`image-preview ${
                  isBannerSelected ? "selected" : ""
                }`}
                src={groupFormData?.comunityBanner?.previewUrl || DefaultCover}
                alt={groupFormData?.comunityBanner || "Banner da Comunidade"}
              />
            </ImageContainer>
          </div>
        ) : (
          <img
            src={
              groupFormData?.comunityBanner
                ? groupFormData.comunityBanner
                : DefaultCover
            }
            alt={groupFormData.comunityTitle}
          />
        )}

        <UserPhoto>
          {isEditable ? (
            <ImageContainer>
              <input
                type="file"
                name="comunityImage"
                id="comunityImage"
                accept="image/*"
                className="image-input"
                onChange={handleImageChange}
              />
              <img
                className={`image-preview ${isImageSelected ? "selected" : ""}`}
                src={groupFormData?.comunityImage?.previewUrl || DefaultAvatar}
                alt={groupFormData?.comunityTitle || "Avatar da Comunidade"}
              />
              <EditIcon />
            </ImageContainer>
          ) : (
            <img
              src={
                groupFormData?.comunityImage
                  ? groupFormData.comunityImage
                  : DefaultAvatar
              }
              alt={groupFormData?.comunityTitle}
              className="image-preview"
            />
          )}
          <ComunityUsername>
            <p>
              {groupFormData?.comunityTitle
                ? groupFormData.comunityTitle
                : "Nome Da Comunidade"}
            </p>
            <p>
              @
              {groupFormData?.comunityUsername
                ? groupFormData.comunityUsername
                : "nomedecomunidade"}
            </p>
          </ComunityUsername>
        </UserPhoto>

        <ComunityInfosAndBack>
          <Link to="/home">
            <FaArrowLeft />
          </Link>
          <ComunityInformations>
            <ComunityName>
              <p>
                {groupFormData?.comunityTitle
                  ? groupFormData.comunityTitle
                  : "Nome Da Comunidade"}
              </p>
            </ComunityName>
            <ComunityAddress>
              <LocationIcon />
              {groupFormData?.comunityAddress
                ? groupFormData.comunityAddress
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
            <label htmlFor="comunityDescription">Adicionar Bio/Sobre</label>
            <div className="textarea-wrapper">
              <textarea
                id="comunityDescription"
                name="comunityDescription"
                placeholder="Escrever sobre..."
                value={bioAboutText}
                onChange={handleBioAboutChange}
                maxLength={maxBioAboutLength}
              />
              <span className="char-counter">
                {bioAboutText.length}/{maxBioAboutLength}
              </span>
            </div>
          </div>

          <div className="groupname-address">
            <div className="register-group-address">
              <label htmlFor="">Mude o Nome do Grupo</label>
              <input
                type="text"
                name="comunityTitle"
                onChange={handleInputChange}
                // value={groupFormData?.comunityTitle}
                maxLength={28}
                minLength={10}
                placeholder="Nome Da Comunidade"
              />
            </div>

            <div className="register-group-address">
              <label htmlFor="">Localidade</label>
              <div className="field-address">
                <LocationIcon />
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
          </div>

          <div className="interest-groups">
            <div className="register-interest-groups">
              <span>Interesses do Grupo</span>
              <div className="container-interests-groups">
                <InterestGroup
                  onGroupSelectionChange={handleGroupSelectionChange}
                  selectedGroups={selectedGroupInterests}
                />
              </div>
            </div>
          </div>

          <div className="sendInfosOfGroup">
            <Button onClick={handleSubmit}>Salvar</Button>
          </div>
        </ContainerEditable>
      ) : (
        ""
      )}
    </ContainerWrapper>
  );
};

export default GroupHeader;
