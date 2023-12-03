import { screenBackgroundWithColorStyle } from "ScreenBackground/screenBackground.styled";

interface GeneralProps {
  children?: React.ReactNode;
}

export const ScreenBackground: React.FC<GeneralProps> = (props) => {
  const { children } = props;
  const classes = screenBackgroundWithColorStyle();

  return (<div className={classes.root} >
    { children }
  </div>);
};
