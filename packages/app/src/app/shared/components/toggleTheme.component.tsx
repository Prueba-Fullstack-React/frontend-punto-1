import React from 'react';
import { IconContainer } from '@frontend/components';
import { useModeContext } from '../hooks/useThemeMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface NoProps {}

export const ToggleThemeComponent: React.FC<NoProps> = () => {
  const { mode, toggleMode } = useModeContext();

  return (
    <IconContainer color="inherit" onClick={() => toggleMode()}>
      {mode === 'dark' ? (
        <Brightness7Icon sx={{ color: 'text.primary' }} />
      ) : (
        <Brightness4Icon sx={{ color: 'text.primary' }} />
      )}
    </IconContainer>
  );
};
