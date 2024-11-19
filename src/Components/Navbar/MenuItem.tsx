// libraries
import { FC } from 'react';
import { MenuItem, Typography } from '@mui/material';
import axios from 'axios';
// providers
import { useTheme } from '../../Context/useTheme';
// files
import COLOURS from '../../Theme/Colours';
// styles

type MenuItemProps = {
  setting: string;
};

const fetchUser = () => {
  try {
    axios
      .get(`${import.meta.env.VITE_API_ADDRESS}User/1`)
      .then((response) => handleLogin(response))
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleLogin = (response: any) => {
  if (response.status === 200) {
    localStorage.setItem('userId', response.data.userId);
    localStorage.setItem('userName', response.data.userName);
    localStorage.setItem('userRole', response.data.userRole);
    window.location.reload();
  }
};

const NavbarMenuItem: FC<MenuItemProps> = ({ setting }) => {
  const { darkMode } = useTheme();

  const redirectEventTickets = () => {
    window.location.href = 'https://westlan.co.uk/events';
  };

  const redirectSettings = () => {
    window.location.href = 'https://westlan.co.uk/settings';
  };

  const loginHandler = () => {
    fetchUser();
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
      case 'Log in':
        loginHandler();
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
