import { FC } from 'react';
import COLOURS from '../../Theme/Colours';
import Button from '@mui/material/Button';

type ButtonProps = {
  buttonName: string;
};

const NavButton: FC<ButtonProps> = ({ buttonName }) => {
  const locationSwitch = () => {
    switch (buttonName) {
      case 'Events':
        window.location.href = 'https://westlan.co.uk/events';
        break;
      case 'Photos':
        window.location.href = 'https://westlan.co.uk/photos';
        break;
      case 'FAQs':
        window.location.href = 'https://westlan.co.uk/faqs';
        break;
      case 'Support':
        window.location.href = 'https://westlan.co.uk/support';
        break;
      default:
        window.location.href = 'https://westlan.co.uk';
    }
  };

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
      onClick={() => locationSwitch()}
    >
      {buttonName}
    </Button>
  );
};

export default NavButton;
