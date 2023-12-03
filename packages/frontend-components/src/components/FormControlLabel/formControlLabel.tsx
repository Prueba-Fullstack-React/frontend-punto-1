// @frontend/components/FormControlLabel.tsx
import React from 'react';
import { FormControlLabelProps, FormControlLabel as MuiFormControlLabel } from '@mui/material';

export const FormControlLabel: React.FC<FormControlLabelProps> = (props) => {
  return <MuiFormControlLabel {...props} />;
};
