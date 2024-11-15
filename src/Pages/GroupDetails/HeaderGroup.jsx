import { LazyLoadStyled, UserPhoto, ComunityInfosAndBack, ComunityInformations, ComunityAddress, ComunityName, ComunityUsername } from "./GroupDetails.js";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import LocationIcon from "../../Icons/LocationIcon";
import DefaultCover from '../../Assets/default-cover.png'
import DefaultAvatar from '../../Assets/default-avatar.png'
import { useState } from "react";

export default function HeaderGroup({ isEditMode, groupName, groupUsername, groupAddress, setGroupName, setGroupUsername, setGroupAddress }) {

  return (
    <LazyLoadStyled height={200} offset={100} once>
      <div className="shadow"></div>
      <img src={isEditMode ? DefaultCover : groupName} alt="Group Cover" />
      <UserPhoto>
        <img src={isEditMode ? DefaultAvatar : groupUsername} alt="Group Profile" />
        <ComunityUsername>
          {isEditMode ? (
            <>
              <p>{groupName}</p>
              <p>@{groupUsername}</p>
            </>
          ) : (
            <>
              <p>{groupName}</p>
              <p>@{groupUsername}</p>
            </>
          )}
        </ComunityUsername>
      </UserPhoto>

      <ComunityInfosAndBack>
        <Link to="/home">
          <FaArrowLeft />
        </Link>
        <ComunityInformations>
          <ComunityName>{groupName}</ComunityName>
          <ComunityAddress>
            <LocationIcon />
            {isEditMode ? (
              <input value={groupAddress} onChange={e => setGroupAddress(e.target.value)} placeholder="Endereço da Comunidade" />
            ) : (
              groupAddress
            )}
          </ComunityAddress>
        </ComunityInformations>
      </ComunityInfosAndBack>
    </LazyLoadStyled>
  );
}
