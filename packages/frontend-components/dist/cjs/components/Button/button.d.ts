import { ButtonProps as ButtonPropsMUI } from '@mui/material/Button';
import React from 'react';
export type ButtonPropsObject = ButtonPropsMUI & {
    label: string;
};
export declare const Button: React.FC<ButtonPropsObject>;
