// libraries
import { Grid, Stack, Typography } from '@mui/material';
import { FC } from 'react';
// providers
// TODO: correct this dark mode context, use query instead passed down
import { useDarkMode } from '../../Context/useDarkMode';
// files
import COLOURS from '../../Theme/Colours';
import FooterButton from './FooterButton';
import SocialButton from './SocialButton';

const Footer: FC = () => {
  const { darkMode } = useDarkMode();

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
          <FooterButton buttonName={'Events'} />
          <FooterButton buttonName={'Photos'} />
          <FooterButton buttonName={'FAQs'} />
          <FooterButton buttonName={'Support'} />
        </Stack>
        <Stack direction="row" justifyContent="center" sx={{ marginTop: '2rem' }}>
          <SocialButton buttonName={'discord'} />
          <SocialButton buttonName={'facebook'} />
          <SocialButton buttonName={'steam'} />
          <SocialButton buttonName={'youtube'} />
        </Stack>
        <Stack direction="row" justifyContent="center" sx={{ marginTop: '2rem' }}>
          <Typography
            sx={{
              color: darkMode ? COLOURS.DARK_MENU_BACKGROUND : COLOURS.DARK_TABLE_CELL_BACKGROUND,
            }}
          >
            © 2024 WestLAN. All rights reserved.
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={4} />
    </Grid>
  );
};

export default Footer;
