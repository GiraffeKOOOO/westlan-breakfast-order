// libraries
import { FC } from 'react';
import { Button, ListItem, ListItemButton, Typography } from '@mui/material';
// providers
import { useDarkMode } from '../../Context/useDarkMode';
// files
import COLOURS from '../../Theme/Colours';
import locationSwitch from './locationSwitch';
// styles

type ButtonProps = {
  isMobile: boolean;
  buttonName: string;
};

const NavButton: FC<ButtonProps> = ({ isMobile, buttonName }) => {
  const { darkMode } = useDarkMode();

  if (isMobile)
    return (
      <ListItem disablePadding sx={{ my: '0.5rem' }}>
        <ListItemButton
          onClick={() => locationSwitch(buttonName)}
          sx={{
            textAlign: 'center',
            color: darkMode ? COLOURS.DARK_BUTTON_PRIMARY : COLOURS.LIGHT_FONT_PRIMARY,
            borderRadius: '0.375rem',
            mx: '0.5rem',
            '&:hover': {
              backgroundColor: darkMode
                ? COLOURS.DARK_BUTTON_HOVER_BACKGROUND
                : COLOURS.DARK_TABLE_FONT,
              color: darkMode ? COLOURS.DARK_FONT_PRIMARY : COLOURS.LIGHT_FONT_PRIMARY,
            },
            '&:focus': {
              backgroundColor: COLOURS.TRANSPARENT,
              border: `2px, solid ${COLOURS.DARK_FONT_PRIMARY}`,
            },
          }}
        >
          <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>{buttonName}</Typography>
        </ListItemButton>
      </ListItem>
    );

  return (
    <Button
      variant="text"
      disableRipple
      sx={{
        backgroundColor: COLOURS.TRANSPARENT,
        border: COLOURS.TRANSPARENT,
        color: darkMode ? COLOURS.DARK_BUTTON_PRIMARY : COLOURS.LIGHT_FONT_PRIMARY,
        textTransform: 'none',
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        fontWeight: '500',
        paddingY: '0.5rem',
        paddingX: '0.75rem',
        textSizeAdjust: '100%',
        marginLeft: '1rem',
        transition: 'all 0s',
        '&:hover': {
          backgroundColor: darkMode
            ? COLOURS.DARK_BUTTON_HOVER_BACKGROUND
            : COLOURS.LIGHT_BACKGROUND_HOVER,
          color: darkMode ? COLOURS.DARK_FONT_PRIMARY : COLOURS.LIGHT_FONT_PRIMARY,
          border: 'none',
        },
      }}
      onClick={() => locationSwitch(buttonName)}
    >
      {buttonName}
    </Button>
  );
};

export default NavButton;
