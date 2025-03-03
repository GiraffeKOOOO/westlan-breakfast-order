// libraries
import { FC } from 'react';
import { Grid, Typography } from '@mui/material';
// files
import COLOURS from '../../Theme/Colours';
import DiscordLogin from '../Navbar/DiscordLogin';
import BreakfastOrderContent from './BreakfastOrderContent';

export type BreakfastOption = {
  name: string;
  ingredients: string[];
  colour: string;
};

type BreakfastOrderContainerProps = {
  darkMode: boolean;
  userName: string | undefined;
  userDiscordId: string | undefined;
  userLoggedIn: boolean;
  lockedStatus: boolean;
};

const BreakfastOrderContainer: FC<BreakfastOrderContainerProps> = ({
  darkMode,
  userName,
  userDiscordId,
  userLoggedIn,
  lockedStatus,
}) => {
  if (!userLoggedIn) {
    return (
      <Grid
        container
        sx={{
          width: '100vw',
          maxWidth: '100vw',
          backgroundColor: darkMode ? COLOURS.DARK_MODE_BUTTON_LIGHT : COLOURS.LIGHT_SECONDARY,
          paddingBottom: '2rem',
        }}
      >
        <Grid item xs={2} />
        <Grid item xs={8} sx={{ paddingTop: '1.5rem', width: '100vw', maxWidth: '100vw' }}>
          <>
            <Typography
              sx={{
                color: darkMode ? COLOURS.DARK_FONT_PRIMARY : COLOURS.LIGHT_FONT_PRIMARY,
                fontSize: {
                  xs: '1.3rem',
                  sm: '1.6rem',
                  md: '2rem',
                  lg: '2rem',
                },
                lineHeight: '1.25rem',
                fontWeight: '500',
                paddingY: '0.5rem',
                paddingX: '0.75rem',
                marginBottom: '1rem',
                textSizeAdjust: '100%',
              }}
            >
              To open the breakfast selection, please log in using Discord
            </Typography>
            <DiscordLogin />
          </>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    );
  } else {
    if (!userLoggedIn || !userName || !userDiscordId) return;
    return (
      <BreakfastOrderContent
        darkMode={darkMode}
        userName={userName}
        userDiscordId={userDiscordId}
        lockedStatus={lockedStatus}
      />
    );
  }
};

export default BreakfastOrderContainer;
