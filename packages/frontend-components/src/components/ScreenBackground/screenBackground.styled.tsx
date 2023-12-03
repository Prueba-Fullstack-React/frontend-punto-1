import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

export const screenBackgroundWithColorStyle = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    overflow: 'auto',
    background: 'lime',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));