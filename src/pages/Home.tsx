// libraries
import { FC, useContext, useState } from 'react';
import { Grid } from '@mui/material';
// providers
import ThemeContext from '../Context/ThemeContext';
// files
import Navbar from '../Components/Navbar/Navbar';
import BreakfastOrderContainer from '../Components/BreakfastOrder/BreakfastOrderContainer';
import COLOURS from '../Theme/Colours';
import Footer from '../Components/Footer/Footer';
// styles

const Home: FC = () => {
  const { darkMode } = useContext(ThemeContext);
  const [darkModeState, setDarkModeState] = useState<boolean>(darkMode);

  console.log(`TEST: `, darkMode);
  console.log(`TEST 2: `, darkModeState);

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
        <Navbar darkMode={darkModeState} setDarkMode={setDarkModeState} />
      </Grid>

      <Grid item xs={12}>
        <BreakfastOrderContainer darkMode={darkModeState} />
      </Grid>

      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Footer darkMode={darkModeState} />
      </Grid>
    </Grid>
  );
};

export default Home;
