// libraries
import { FC, useContext } from 'react';
import { Grid } from '@mui/material';
// providers
import { useDarkMode } from '../Context/useDarkMode';
import UserContext from '../Context/UserContext';
// queries
import useLockedStatus from '../Queries/useLockedStatus';
// files
import Navbar from '../Components/Navbar/Navbar';
import BreakfastOrderContainer from '../Components/BreakfastOrder/BreakfastOrderContainer';
import COLOURS from '../Theme/Colours';
import Footer from '../Components/Footer/Footer';

const Home: FC = () => {
  const { darkMode } = useDarkMode();
  const { data: lockedStatus, isLoading } = useLockedStatus();
  const { userName, userDiscordId } = useContext(UserContext);
  const userLoggedIn = userName !== '' && userName !== undefined;

  return (
    <Grid
      container
      sx={{
        width: '100vw',
        maxWidth: '100vw',
        height: '100vh',
        backgroundColor: darkMode ? COLOURS.DARK_MODE_BUTTON_LIGHT : COLOURS.LIGHT_SECONDARY,
      }}
    >
      <Grid item xs={12}>
        <Navbar />
      </Grid>

      <Grid item xs={12}>
        {!isLoading && (
          <BreakfastOrderContainer
            darkMode={darkMode}
            userName={userName}
            userDiscordId={userDiscordId}
            userLoggedIn={userLoggedIn}
            lockedStatus={lockedStatus[0].value}
          />
        )}
      </Grid>

      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default Home;
