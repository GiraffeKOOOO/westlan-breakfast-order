// libraries
import { FC } from 'react';
import { Grid } from '@mui/material';
// providers
import { useDarkMode } from '../Context/useDarkMode';
// files
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import COLOURS from '../Theme/Colours';
import AdminPanel from '../Components/AdminPanel/AdminPanel';
// styles

const Admin: FC = () => {
  const { darkMode } = useDarkMode();

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
        <AdminPanel />
      </Grid>

      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default Admin;
