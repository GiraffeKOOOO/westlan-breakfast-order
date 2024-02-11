// libraries
// providers
// files
// styles

import { Grid } from '@mui/material';
import Navbar from '../Components/Navbar/Navbar';

const Home = () => {
  return (
    <Grid container sx={{ width: '100vw' }}>
      <Grid item xs={12}>
        <Navbar />
      </Grid>
      <Grid item xs={12}>
        <p>soemething</p>
        <p>soemething 2</p>
      </Grid>
    </Grid>
  );
};

export default Home;
