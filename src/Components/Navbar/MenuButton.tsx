// libraries
import { FC, MouseEvent, useContext } from 'react';
import { Avatar, IconButton, Stack, Typography } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// providers
// files
import COLOURS from '../../Theme/Colours';
import { useTheme } from '../../Context/useTheme';
import UserContext from '../../Context/UserContext';
// styles

type MenuButtonProps = {
  isMobile: boolean;
  isOpen: boolean;
  handleOpenUserMenu: (event: MouseEvent<HTMLElement>) => void;
};

const MenuButton: FC<MenuButtonProps> = ({ isMobile, isOpen, handleOpenUserMenu }) => {
  // TODO: add a avatar fetch url from the API
  const avatarUrl = '../assets/person-avatar.png';
  const { darkMode } = useTheme();
  const { userName } = useContext(UserContext);

  if (isMobile)
    return (
      <Stack
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
        onClick={handleOpenUserMenu}
        sx={{ paddingY: '0.5rem' }}
      >
        <IconButton
          sx={{
            marginLeft: '1rem',
            '&:hover': { backgroundColor: COLOURS.TRANSPARENT },
            '&:focus': {
              backgroundColor: COLOURS.TRANSPARENT,
            },
          }}
        >
          <Avatar alt="user avatar" src={avatarUrl} sx={{ width: '2rem', height: '2rem' }} />
        </IconButton>
        <Typography
          sx={{
            paddingX: '0.5rem',
            color: darkMode ? COLOURS.DARK_FONT_PRIMARY : COLOURS.LIGHT_FONT_PRIMARY,
          }}
        >
          {userName}
        </Typography>
        {isOpen ? (
          <ExpandMoreIcon
            sx={{ color: darkMode ? COLOURS.DARK_FONT_PRIMARY : COLOURS.LIGHT_FONT_PRIMARY }}
          />
        ) : (
          <ExpandLessIcon
            sx={{ color: darkMode ? COLOURS.DARK_FONT_PRIMARY : COLOURS.LIGHT_FONT_PRIMARY }}
          />
        )}
      </Stack>
    );

  return (
    <IconButton sx={{ marginLeft: '1rem' }} onClick={handleOpenUserMenu}>
      <Avatar alt="user avatar" src={avatarUrl} sx={{ width: '2rem', height: '2rem' }} />
    </IconButton>
  );
};

export default MenuButton;
