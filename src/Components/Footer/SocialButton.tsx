// libraries
import { FC, useCallback } from 'react';
import { IconButton } from '@mui/material';

// files
import socialNavigationSwitch from './socialNavigationSwitch';
import socialButtonIconSwitch from './socialButtonIconSwitch';
import COLOURS from '../../Theme/Colours';

type SocialButtonProps = {
  darkMode: boolean;
  buttonName: string;
};

const SocialButton: FC<SocialButtonProps> = ({ darkMode, buttonName }) => {
  const iconSwitch = useCallback((buttonName: string) => {
    return socialButtonIconSwitch(buttonName);
  }, []);

  return (
    <IconButton
      sx={{
        backgroundColor: COLOURS.TRANSPARENT,
        border: COLOURS.TRANSPARENT,
        color: darkMode ? COLOURS.DARK_MENU_BACKGROUND : COLOURS.DARK_TABLE_CELL_BACKGROUND,
        '&:hover': {
          backgroundColor: COLOURS.TRANSPARENT,
          color: darkMode ? COLOURS.DARK_FONT_PRIMARY : COLOURS.LIGHT_FONT_PRIMARY,
        },
      }}
      onClick={() => socialNavigationSwitch(buttonName)}
    >
      {iconSwitch(buttonName)}
    </IconButton>
  );
};

export default SocialButton;
