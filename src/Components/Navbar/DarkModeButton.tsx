// libraries
import { FC } from 'react';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
// providers
import { useTheme } from '../../Context/useTheme';
// files
import COLOURS from '../../Theme/Colours';
// styles

const DarkModeButton: FC = () => {
  const { darkMode, enableDarkMode, disableDarkMode } = useTheme();

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
