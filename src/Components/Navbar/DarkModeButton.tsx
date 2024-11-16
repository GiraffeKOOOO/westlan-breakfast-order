// libraries
import { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import COLOURS from '../../Theme/Colours';
// providers
// files
// styles

const DarkModeButton: FC<{
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}> = ({ darkMode, setDarkMode }) => {
  const darkModeChange = useCallback(() => {
    // TODO : add api calls to ensure dark mode transition on main website
    window.localStorage.setItem('darkMode', darkMode ? 'true' : 'false');
    setDarkMode(!darkMode);
  }, [darkMode, setDarkMode]);

  return (
    <IconButton onClick={darkModeChange}>
      {darkMode ? (
        <DarkModeIcon
          sx={{
            color: COLOURS.DARK_MODE_BUTTON_LIGHT,
            '&:hover': {
              color: COLOURS.BLACK,
            },
          }}
        />
      ) : (
        <LightModeIcon
          sx={{
            color: COLOURS.DARK_FONT_SECONDARY,
            '&:hover': {
              color: COLOURS.DARK_FONT_PRIMARY,
            },
          }}
        />
      )}
    </IconButton>
  );
};

export default DarkModeButton;
