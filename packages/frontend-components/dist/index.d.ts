/// <reference types="react" />
import { Theme } from '@mui/material/styles';
import { ButtonProps } from '@mui/material/Button';
import React$1 from 'react';
import { IconButtonProps } from '@mui/material/IconButton';
import { BoxProps, TextFieldProps, FormControlProps, CheckboxProps, FormControlLabelProps } from '@mui/material';

type ButtonPropsObject = ButtonProps & {
    label: string;
};
declare const Button: React$1.FC<ButtonPropsObject>;

declare const Input: React.FC<any>;

interface GeneralProps$1 {
    children?: React.ReactNode;
}
declare const IconContainer: React.FC<GeneralProps$1 & IconButtonProps>;

interface GeneralProps {
    children?: React.ReactNode;
}
declare const ScreenBackground: React.FC<GeneralProps>;

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React$1.ReactNode;
}
declare const Modal: React$1.FC<ModalProps>;

declare const Box: React$1.FC<BoxProps>;

declare const TextField: React$1.FC<TextFieldProps>;

declare const FormControl: React$1.FC<FormControlProps>;

declare const Checkbox: React$1.FC<CheckboxProps>;

declare const FormControlLabel: React$1.FC<FormControlLabelProps>;

declare module '@mui/styles' {
    interface DefaultTheme extends Theme {
    }
}

export { Box, Button, ButtonPropsObject, Checkbox, FormControl, FormControlLabel, IconContainer, Input, Modal, ScreenBackground, TextField };
