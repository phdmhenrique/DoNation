import { ModalOverlay, ModalContent, ModalContentInfos, ModalContentButtons, ModalHeader } from './ConfirmationModal.ts'

import Button from '../Button/Button.tsx';

// icon
import { IoMdCloseCircle } from "react-icons/io";

interface ConfirmationModalProps {
  isOpen: boolean;
  groupName: string;
  onConfirm: () => void;
  onClose: () => void;
  isCancel?: boolean;
}

const ConfirmationModal = ({ isOpen, groupName, onConfirm, onClose, isCancel }: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader><IoMdCloseCircle onClick={onClose} /></ModalHeader>
        <ModalContentInfos>
          <h2>{isCancel ? 'Cancelar Solicitação' : 'Se Juntar'}</h2>
          <p>{isCancel ? 'Cancelar solicitação para ingressar em:' : 'Enviar solicitação para ingressar em:'}</p>
          <span>"{groupName}"</span>
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
