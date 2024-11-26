import { ModalOverlay, ModalContent, ModalContentInfos, ModalContentButtons, ModalHeader } from './ConfirmationModal.js'

import Button from '../Button/Button.jsx';

// icon
import { IoMdCloseCircle } from "react-icons/io";

const ConfirmationModal = ({ isOpen, groupName, onConfirm, onClose, isCancel }) => {
  if (!isOpen) return null;

  console.log(groupName);
  

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader><IoMdCloseCircle onClick={onClose} /></ModalHeader>
        <ModalContentInfos>
          <h2>{isCancel ? 'Cancelar Solicitação' : 'Se Juntar'}</h2>
          <p>{isCancel ? 'Cancelar solicitação para ingressar em:' : 'Enviar solicitação para ingressar em:'}</p>
          <span>"{groupName || "Nome do grupo indisponível"}"</span>
        </ModalContentInfos>
        <ModalContentButtons>
          <Button addStatusClass="active" onClick={onConfirm}>{isCancel ? 'Sim' : 'Enviar'}</Button>
          <Button addStatusClass="inactive" onClick={onClose}>{isCancel ? 'Não' : 'Cancelar'}</Button>
        </ModalContentButtons>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmationModal;
