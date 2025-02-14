import { Button, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { FaDiscord } from 'react-icons/fa';
import COLOURS from '../../Theme/Colours';

const CLIENT_ID = `${import.meta.env.VITE_CLIENT_ID}`;
const REDIRECT_URI = `${import.meta.env.VITE_REDIRECT_ADDRESS}`;
const OAUTH_URL = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
  REDIRECT_URI,
)}&response_type=token&scope=identify`;

const DiscordLogin: FC = () => {
  const handleLogin = () => {
    window.location.href = OAUTH_URL;
  };

  return (
    <Button
      variant="contained"
      onClick={handleLogin}
      sx={{
        backgroundColor: COLOURS.DISCORD_BUTTON,
        '&:hover': { backgroundColor: COLOURS.DISCORD_BUTTON_HOVER },
      }}
    >
      <Stack direction="row" spacing={1}>
        <Typography>Login with Discord</Typography>
        <FaDiscord style={{ marginTop: 'auto', marginBottom: 'auto', fontSize: '1.3rem' }} />
      </Stack>
    </Button>
  );
};

export default DiscordLogin;
