import { ButtonProps as ButtonPropsMUI } from '@mui/material/Button';
import React from 'react';
import ButtonComponent from './button.styled';

export type ButtonPropsObject = ButtonPropsMUI & {
  label: string;
};

export const Button: React.FC<ButtonPropsObject> = (props) => {
  const { label } = props;

  return (<ButtonComponent { ...props }>
    {label}
  </ButtonComponent>);
};
