// libraries
import { Grid } from '@mui/material';
// providers
// files
import Navbar from '../Components/Navbar/Navbar';
import BackgroundBanner from '../Components/BackgroundBanner/BackgroundBanner';
import BreakfastOrderContainer from '../Components/BreakfastOrder/BreakfastOrderContainer';
import COLOURS from '../Theme/Colours';
import Footer from '../Components/Footer/Footer';
// styles

const Home = () => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: COLOURS.DARK_MODE_BUTTON_LIGHT,
        width: '100vw',
        maxWidth: '100vw',
      }}
    >
      <Grid item xs={12}>
        <Navbar />
      </Grid>
      <Grid item xs={12}>
        <BackgroundBanner />
      </Grid>
      <Grid item xs={12}>
        <BreakfastOrderContainer />
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default Home;
