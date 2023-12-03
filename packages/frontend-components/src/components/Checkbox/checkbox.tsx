// @frontend/components/Checkbox.tsx
import React from 'react';
import { CheckboxProps, Checkbox as MuiCheckbox } from '@mui/material';

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  return <MuiCheckbox {...props} />;
};
