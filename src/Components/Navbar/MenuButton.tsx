// libraries
import { FC, MouseEvent } from 'react';
import { Avatar, IconButton } from '@mui/material';
// providers
// files
// styles

type MenuButtonProps = {
  handleOpenUserMenu: (event: MouseEvent<HTMLElement>) => void;
};

const MenuButton: FC<MenuButtonProps> = ({ handleOpenUserMenu }) => {
  // TODO: add a avatar fetch url from the API
  const avatarUrl = '../assets/person-avatar.png';

  return (
    <IconButton style={{ marginLeft: '1rem' }} onClick={handleOpenUserMenu}>
      <Avatar alt="user avatar" src={avatarUrl} sx={{ width: '2rem', height: '2rem' }} />
    </IconButton>
  );
};

export default MenuButton;
