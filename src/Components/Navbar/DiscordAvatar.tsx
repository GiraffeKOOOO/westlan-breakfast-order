import { FC } from 'react';
import { Avatar } from '@mui/material';

const DiscordAvatar: FC<{ discordUserId: string; userAvatar: string }> = ({
  discordUserId,
  userAvatar,
}) => {
  const avatarUrl = `https://cdn.discordapp.com/avatars/${discordUserId}/${userAvatar}.png`;

  return (
    <Avatar
      src={avatarUrl}
      alt="Discord Avatar"
      sx={{ height: '2rem', width: '2rem', borderRadius: '50%' }}
    />
  );
};

export default DiscordAvatar;
