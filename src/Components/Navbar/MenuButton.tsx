// libraries
import { FC, MouseEvent, useContext } from 'react';
import { IconButton, Stack, Typography } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// providers
// files
import COLOURS from '../../Theme/Colours';
import { useTheme } from '../../Context/useTheme';
import UserContext from '../../Context/UserContext';
import DiscordAvatar from './DiscordAvatar';
// styles

type MenuButtonProps = {
  isMobile: boolean;
  isOpen: boolean;
  handleOpenUserMenu: (event: MouseEvent<HTMLElement>) => void;
};

const MenuButton: FC<MenuButtonProps> = ({ isMobile, isOpen, handleOpenUserMenu }) => {
  // TODO: add a avatar fetch url from the API
  const { darkMode } = useTheme();
  const { userName, userAvatar, userDiscordId } = useContext(UserContext);

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
          {userAvatar && userDiscordId && (
            <DiscordAvatar discordUserId={userDiscordId} userAvatar={userAvatar} />
          )}
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
      {userAvatar && userDiscordId && (
        <DiscordAvatar discordUserId={userDiscordId} userAvatar={userAvatar} />
      )}
    </IconButton>
  );
};

export default MenuButton;
