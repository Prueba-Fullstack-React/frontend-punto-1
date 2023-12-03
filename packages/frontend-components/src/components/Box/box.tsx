// @frontend/components/Box.tsx
import React from 'react';
import { BoxProps, Box as MuiBox } from '@mui/material';

export const Box: React.FC<BoxProps> = (props) => {
  return <MuiBox {...props} />;
};
