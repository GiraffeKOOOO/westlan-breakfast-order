// files
import { FaDiscord } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaSteam } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';

const socialButtonIconSwitch = (buttonName: string) => {
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
};

export default socialButtonIconSwitch;
