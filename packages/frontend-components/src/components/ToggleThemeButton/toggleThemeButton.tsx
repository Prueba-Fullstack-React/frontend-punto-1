import { iconContainerStyle } from "./toggleThemeButton.styled";
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

interface GeneralProps {
  children?: React.ReactNode;
}

export const IconContainer: React.FC<GeneralProps & IconButtonProps> = (props) => {
  const { children, ...other } = props;
  const classes = iconContainerStyle();

  return (<IconButton className={classes.root} {...other} role='button' aria-label='Botón del Tema'>
    { children }
  </IconButton>);
};