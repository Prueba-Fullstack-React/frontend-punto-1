import MUIButton from '@mui/material/Button';
import { styled } from '@mui/styles';

const StyledButton = styled(MUIButton)(({ theme }) => ({
  '&&': {
    textTransform: 'none',
    '&.Mui-disabled': {
      backgroundColor: theme.palette.grey[50],
    },
  }
}));

export default StyledButton;
