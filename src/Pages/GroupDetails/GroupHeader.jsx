import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ComunityAddress,
  ComunityInformations,
  ComunityInfosAndBack,
  ComunityName,
  ComunityUsername,
  LazyLoadStyled,
  UserPhoto,
} from "./GroupDetails.js";
import { ContainerWrapper, ContainerEditable } from "./GroupHeader.js";

import { FaArrowLeft } from "react-icons/fa";
// import { IoMdShare } from "react-icons/io";
import LocationIcon from "../../Icons/LocationIcon.jsx";
import DefaultAvatar from "../../Assets/default-avatar.png";
import DefaultCover from "../../Assets/default-cover.png";
import InterestGroup from "../../Components/InterestGroup/InterestGroup.jsx";

// Definindo o componente `GroupHeader`
const GroupHeader = ({ groupData = {}, isEditable, onChange }) => {
  const [group, setGroup] = useState(
    groupData || {
      comunityTitle: "NomeDaComunidade",
      comunityUsername: "nomedecomunidade",
      comunityAddress: "Endereço da Comunidade",
      comunityBanner: "",
      comunityImage: "",
    }
  );
  const [selectedGroupInterests, setSelectedGroupInterests] = useState(
    groupData.interests || []
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

    if (name === "comunityTitle") {
      const normalizedUsername = value.toLowerCase().replace(/\s+/g, "");
      updatedGroup.comunityUsername = normalizedUsername;
    }

    setGroup(updatedGroup);
    if (onChange) onChange(updatedGroup); // Atualiza no componente pai, se fornecido
  };

  // Atualiza as imagens no estado e fornece pré-visualização
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const updatedGroup = { ...group, [name]: URL.createObjectURL(file) };
      setGroup(updatedGroup);
      if (onChange) onChange(updatedGroup); // Envia o estado atualizado para o pai (opcional)
    }
  };

  const handleGroupSelectionChange = (updatedGroups) => {
    setSelectedGroupInterests(updatedGroups);
    onChange({ ...groupData, interests: updatedGroups });
  };

  return (
    <ContainerWrapper>
      <LazyLoadStyled height={200} offset={100} once>
        <div className="shadow"></div>

        {isEditable ? (
          <div className="container-register_image">
            <input
              type="file"
              name="comunityBanner"
              id="comunityBanner"
              accept="image/*"
              onChange={handleImageChange}
            />
            <img
              className="register_image"
              src={group?.comunityBanner || DefaultCover}
              alt={group?.comunityBanner || "Banner da Comunidade"}
            />
          </div>
        ) : (
          <img
            src={group?.comunityBanner ? group.comunityBanner : DefaultCover}
            alt={group.comunityTitle}
          />
        )}

        <UserPhoto>
          {isEditable ? (
            <>
            <input
                type="file"
                name="comunityImage"
                id="comunityImage"
                accept="image/*"
                onChange={handleImageChange}
              />
            </>
          ) : null}
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
            <p>
              @
              {group?.comunityUsername
                ? group.comunityUsername
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
        </ContainerEditable>
      ) : (
        ""
      )}
    </ContainerWrapper>
  );
};

export default GroupHeader;
