// libraries
import { FC } from 'react';
import { MenuItem, Typography } from '@mui/material';
// providers
import { useDarkMode } from '../../Context/useDarkMode';
// files
import COLOURS from '../../Theme/Colours';
// styles

type MenuItemProps = {
  setting: string;
};

const NavbarMenuItem: FC<MenuItemProps> = ({ setting }) => {
  const { darkMode } = useDarkMode();

  const redirectEventTickets = () => {
    window.location.href = 'https://westlan.co.uk/events';
  };

  const redirectSettings = () => {
    window.location.href = 'https://westlan.co.uk/settings';
  };

  const logoutHandler = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleMenuOption = (setting: string) => {
    switch (setting) {
      case 'Event Tickets':
        redirectEventTickets();
        break;
      case 'Settings':
        redirectSettings();
        break;
      case 'Sign out':
        logoutHandler();
        break;
      default:
        return;
    }
  };

  return (
    <MenuItem
      key={setting}
      onClick={() => handleMenuOption(setting)}
      sx={{
        paddingX: '1rem',
        '&:hover': {
          backgroundColor: darkMode ? COLOURS.DARK_SECONDARY : COLOURS.LIGHT_SECONDARY,
        },
      }}
    >
      <Typography
        sx={{
          color: darkMode ? COLOURS.DARK_FONT_PRIMARY : COLOURS.LIGHT_FONT_SECONDARY,
          fontSize: '0.875rem',
        }}
      >
        {setting}
      </Typography>
    </MenuItem>
  );
};

export default NavbarMenuItem;
