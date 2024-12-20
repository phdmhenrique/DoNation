import {
  ModalOverlay,
  ModalContent,
  ModalContentInfos,
  ModalContentButtons,
  ModalHeader,
} from "./ConfirmationModal.js";

import Button from "../Button/Button.jsx";

// icon
import { IoMdCloseCircle } from "react-icons/io";

const ConfirmationModal = ({
  isOpen,
  groupName,
  onConfirm,
  onClose,
  isCancel,
  isSubmitting,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <IoMdCloseCircle onClick={onClose} />
        </ModalHeader>
        <ModalContentInfos>
          <h2>{isCancel ? "Cancelar Solicitação" : "Se Juntar"}</h2>
          <p>
            {isCancel
              ? "Cancelar solicitação para ingressar em:"
              : "Enviar solicitação para ingressar em:"}
          </p>
          <span>&quot;{groupName || "Nome do grupo indisponível"}&quot;</span>
        </ModalContentInfos>
        <ModalContentButtons>
          <Button addStatusClass="active" onClick={onConfirm} disabled={isSubmitting}>
            {isCancel ? "Sim" : "Enviar"}
          </Button>
          <Button addStatusClass="inactive" onClick={onClose} disabled={isSubmitting}>
            {isCancel ? "Não" : "Cancelar"}
          </Button>
        </ModalContentButtons>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmationModal;
