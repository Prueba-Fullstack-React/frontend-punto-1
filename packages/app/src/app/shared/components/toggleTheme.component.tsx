import React from 'react';
import { IconContainer } from '@frontend/components';
import { useModeContext } from '../hooks/useThemeMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface ToggleThemeComponentProps {}

const styles = {
  icon: {
    color: 'text.primary',
  },
};

export const ToggleThemeComponent: React.FC<ToggleThemeComponentProps> = () => {
  const { mode, toggleMode } = useModeContext();

  return (
    <IconContainer color="inherit" onClick={toggleMode}>
      {mode === 'dark' ? (
        <Brightness7Icon sx={styles.icon} />
      ) : (
        <Brightness4Icon sx={styles.icon} />
      )}
    </IconContainer>
  );
};
