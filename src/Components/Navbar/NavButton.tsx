// libraries
import { FC } from 'react';
import { Button, ListItem, ListItemButton, Typography } from '@mui/material';
// providers
// files
import COLOURS from '../../Theme/Colours';
import locationSwitch from './locationSwitch';
// styles

type ButtonProps = {
  isMobile: boolean;
  buttonName: string;
};

const NavButton: FC<ButtonProps> = ({ isMobile, buttonName }) => {
  if (isMobile)
    return (
      <ListItem disablePadding sx={{ my: '0.5rem' }}>
        <ListItemButton
          onClick={() => locationSwitch(buttonName)}
          sx={{
            textAlign: 'center',
            color: COLOURS.DARK_BUTTON_PRIMARY,
            borderRadius: '0.375rem',
            mx: '0.5rem',
            '&:hover': {
              backgroundColor: COLOURS.DARK_BUTTON_HOVER_BACKGROUND,
              color: COLOURS.DARK_FONT_PRIMARY,
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
        color: COLOURS.DARK_BUTTON_PRIMARY,
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
          backgroundColor: COLOURS.DARK_BUTTON_HOVER_BACKGROUND,
          color: COLOURS.DARK_FONT_PRIMARY,
          border: 'none',
        },
        '&:focus': {
          backgroundColor: COLOURS.DARK_BUTTON_FOCUS_BACKGROUND,
          color: COLOURS.DARK_FONT_PRIMARY,
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
