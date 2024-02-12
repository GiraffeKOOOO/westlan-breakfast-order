// libraries
import { FC } from 'react';
import { Button } from '@mui/material';
import COLOURS from '../../Theme/Colours';
// providers
// files
// styles

type FooterButtonProps = {
  buttonName: string;
};

const FooterButton: FC<FooterButtonProps> = ({ buttonName }) => {
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
        color: COLOURS.DARK_MENU_BACKGROUND,
        textTransform: 'none',
        '&:hover': {
          backgroundColor: COLOURS.TRANSPARENT,
          color: COLOURS.DARK_FONT_PRIMARY,
        },
      }}
      onClick={() => locationSwitch()}
    >
      {buttonName}
    </Button>
  );
};

export default FooterButton;
