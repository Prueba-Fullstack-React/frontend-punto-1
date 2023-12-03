// @frontend/components/FormControl.tsx
import React from 'react';
import { FormControlProps, FormControl as MuiFormControl } from '@mui/material';

export const FormControl: React.FC<FormControlProps> = (props) => {
  return <MuiFormControl {...props} />;
};
