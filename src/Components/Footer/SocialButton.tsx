// libraries
import { FC, useCallback } from 'react';
import { IconButton } from '@mui/material';
import { FaDiscord } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaSteam } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';

// providers
// files
import COLOURS from '../../Theme/Colours';
// styles

type SocialButtonProps = {
  buttonName: string;
};

const SocialButton: FC<SocialButtonProps> = ({ buttonName }) => {
  const locationSwitch = () => {
    switch (buttonName) {
      case 'discord':
        window.location.href = 'https://discord.com/invite/bvMNNdR';
        break;
      case 'facebook':
        window.location.href = 'https://www.facebook.com/WestLANUK/';
        break;
      case 'steam':
        window.location.href = 'https://steamcommunity.com/groups/westlan';
        break;
      case 'youtube':
        window.location.href = 'https://www.youtube.com/channel/UCBkCvCVwzN_GBXS8Ywm2ZbQ';
        break;
      default:
        window.location.href = 'https://westlan.co.uk';
    }
  };

  const iconSwitch = useCallback(() => {
    switch (buttonName) {
      case 'discord':
        return <FaDiscord />;
      case 'facebook':
        return <FaFacebook />;
      case 'steam':
        return <FaSteam />;
      case 'youtube':
        return <FaYoutube />;
      default:
    }
  }, []);

  return (
    <IconButton
      sx={{
        backgroundColor: COLOURS.TRANSPARENT,
        border: COLOURS.TRANSPARENT,
        color: COLOURS.DARK_MENU_BACKGROUND,
        '&:hover': {
          backgroundColor: COLOURS.TRANSPARENT,
          color: COLOURS.DARK_FONT_PRIMARY,
        },
      }}
      onClick={() => locationSwitch()}
    >
      {iconSwitch()}
    </IconButton>
  );
};

export default SocialButton;
