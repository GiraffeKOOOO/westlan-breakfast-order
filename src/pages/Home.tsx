// libraries
import { Grid } from '@mui/material';
// providers
// files
import Navbar from '../Components/Navbar/Navbar';
import BackgroundBanner from '../Components/BackgroundBanner/BackgroundBanner';
import BreakfastOrderContainer from '../Components/BreakfastOrder/BreakfastOrderContainer';
import COLOURS from '../Theme/Colours';
// styles

const Home = () => {
  return (
    <Grid
      container
      sx={{
        minWidth: '100vw',
        maxWidth: '100vw',
        backgroundColor: COLOURS.DARK_MODE_BUTTON_LIGHT,
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
    </Grid>
  );
};

export default Home;
