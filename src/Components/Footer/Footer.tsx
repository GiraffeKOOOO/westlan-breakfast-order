// libraries
import { FC } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
// files
import COLOURS from '../../Theme/Colours';
import FooterButton from './FooterButton';
import SocialButton from './SocialButton';

type FooterProps = {
  darkMode: boolean;
};

const Footer: FC<FooterProps> = ({ darkMode }) => {
  return (
    <Grid
      container
      sx={{
        width: '100vw',
        maxWidth: '100vw',
        backgroundColor: darkMode ? COLOURS.FOOTER_BACKGROUND : COLOURS.LIGHT_PRIMARY,
        paddingY: '3rem',
        paddingX: '2rem',
        paddingTop: '4rem',
      }}
    >
      <Grid item xs={4} />
      <Grid item xs={4}>
        <Stack direction="row" justifyContent="center">
          <FooterButton darkMode={darkMode} buttonName={'Events'} />
          <FooterButton darkMode={darkMode} buttonName={'Photos'} />
          <FooterButton darkMode={darkMode} buttonName={'FAQs'} />
          <FooterButton darkMode={darkMode} buttonName={'Support'} />
        </Stack>
        <Stack direction="row" justifyContent="center" sx={{ marginTop: '2rem' }}>
          <SocialButton darkMode={darkMode} buttonName={'discord'} />
          <SocialButton darkMode={darkMode} buttonName={'facebook'} />
          <SocialButton darkMode={darkMode} buttonName={'steam'} />
          <SocialButton darkMode={darkMode} buttonName={'youtube'} />
        </Stack>
        <Stack direction="row" justifyContent="center" sx={{ marginTop: '2rem' }}>
          <Typography
            sx={{
              color: darkMode ? COLOURS.DARK_MENU_BACKGROUND : COLOURS.DARK_TABLE_CELL_BACKGROUND,
            }}
          >
            © 2025 WestLAN. All rights reserved.
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={4} />
    </Grid>
  );
};

export default Footer;
