// libraries
import { FC } from 'react';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
// providers
import { useDarkMode } from '../../Context/useDarkMode';
// files
import COLOURS from '../../Theme/Colours';

const DarkModeButton: FC = () => {
  const { darkMode, enableDarkMode, disableDarkMode } = useDarkMode();

  return (
    <IconButton
      onClick={darkMode ? disableDarkMode : enableDarkMode}
      sx={{ '&:focus': { outline: 'none' } }}
      disableRipple
    >
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
