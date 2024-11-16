import { ModalOverlay, ModalContent, ModalContentInfos, ModalContentButtons, ModalHeader } from './ConfirmationModal.js'

import Button from '../Button/Button.jsx';

// icon
import { IoMdCloseCircle } from "react-icons/io";

const ConfirmationModal = ({ isOpen, groupName, onConfirm, onClose, isCancel }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader><IoMdCloseCircle onClick={onClose} /></ModalHeader>
        <ModalContentInfos>
          <h2>{isCancel ? 'Cancel Request' : 'Join'}</h2>
          <p>{isCancel ? 'Cancel the request to join:' : 'Send a request to join:'}</p>
          <span>"{groupName}"</span>
        </ModalContentInfos>
        <ModalContentButtons>
          <Button addStatusClass="active" onClick={onConfirm}>{isCancel ? 'Yes' : 'Send'}</Button>
          <Button addStatusClass="inactive" onClick={onClose}>{isCancel ? 'No' : 'Cancel'}</Button>
        </ModalContentButtons>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmationModal; 
