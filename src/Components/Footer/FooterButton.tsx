// libraries
import { FC } from 'react';
import { Button } from '@mui/material';
// files
import locationSwitch from '../Navbar/locationSwitch';
import COLOURS from '../../Theme/Colours';

type FooterButtonProps = {
  darkMode: boolean;
  buttonName: string;
};

const FooterButton: FC<FooterButtonProps> = ({ darkMode, buttonName }) => {
  return (
    <Button
      variant="text"
      disableRipple
      sx={{
        backgroundColor: COLOURS.TRANSPARENT,
        border: COLOURS.TRANSPARENT,
        color: darkMode ? COLOURS.DARK_MENU_BACKGROUND : COLOURS.DARK_TABLE_CELL_BACKGROUND,
        textTransform: 'none',
        '&:hover': {
          backgroundColor: COLOURS.TRANSPARENT,
          color: darkMode ? COLOURS.DARK_FONT_PRIMARY : COLOURS.LIGHT_FONT_PRIMARY,
        },
      }}
      onClick={() => locationSwitch(buttonName)}
    >
      {buttonName}
    </Button>
  );
};

export default FooterButton;
