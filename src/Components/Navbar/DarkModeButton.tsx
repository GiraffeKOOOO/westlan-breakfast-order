// libraries
import { FC, useCallback, useState } from 'react';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import COLOURS from '../../Theme/Colours';
// providers
// files
// styles

const DarkModeButton: FC = () => {
  const [darkMode, setDarkMode] = useState(true);

  const darkModeChange = useCallback(() => {
    // TODO : add api calls to ensure dark mode transition on main website
    setDarkMode(!darkMode);
  }, [darkMode]);

  return (
    <IconButton onClick={darkModeChange}>
      {darkMode ? (
        <LightModeIcon
          sx={{
            color: COLOURS.DARK_FONT_SECONDARY,
            '&:hover': {
              color: COLOURS.DARK_FONT_PRIMARY,
            },
          }}
        />
      ) : (
        <DarkModeIcon
          sx={{
            color: COLOURS.DARK_MODE_BUTTON_LIGHT,
            '&:hover': {
              color: COLOURS.BLACK,
            },
          }}
        />
      )}
    </IconButton>
  );
};

export default DarkModeButton;
