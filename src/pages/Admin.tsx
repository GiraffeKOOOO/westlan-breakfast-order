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
import AdminPanelContainer from '../Components/AdminPanel/AdminPanelContainer';
import Footer from '../Components/Footer/Footer';
import COLOURS from '../Theme/Colours';

const Admin: FC = () => {
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
          <AdminPanelContainer
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

export default Admin;
