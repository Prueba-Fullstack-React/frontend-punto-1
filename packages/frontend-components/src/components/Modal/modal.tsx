// @frontend/components/Modal.tsx
import React from 'react';
import { Modal as MuiModal, Box } from '@mui/material';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <Box>{children}</Box>
    </MuiModal>
  );
};
