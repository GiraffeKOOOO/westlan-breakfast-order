// libraries
import { Grid } from '@mui/material';
// providers
// files
import Navbar from '../Components/Navbar/Navbar';
import BreakfastOrderContainer from '../Components/BreakfastOrder/BreakfastOrderContainer';
import COLOURS from '../Theme/Colours';
import Footer from '../Components/Footer/Footer';
// styles

const Home = () => {
  return (
    <Grid
      container
      sx={{
        width: '100vw',
        maxWidth: '100vw',
        height: '100vh',
        backgroundColor: COLOURS.DARK_MODE_BUTTON_LIGHT,
      }}
    >
      <Grid item xs={12}>
        <Navbar />
      </Grid>

      <Grid item xs={12}>
        <BreakfastOrderContainer />
      </Grid>

      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default Home;
