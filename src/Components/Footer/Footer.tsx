// libraries
import { Grid, Stack, Typography } from '@mui/material';
import { FC } from 'react';
// providers
// files
import COLOURS from '../../Theme/Colours';
import FooterButton from './FooterButton';
import SocialButton from './SocialButton';
// styles

const Footer: FC = () => {
  return (
    <Grid
      container
      sx={{
        width: '100vw',
        maxWidth: '100vw',
        backgroundColor: COLOURS.FOOTER_BACKGROUND,
        paddingY: '3rem',
        paddingX: '2rem',
        marginTop: '4rem',
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
          <Typography sx={{ color: COLOURS.DARK_MENU_BACKGROUND }}>
            © 2024 WestLAN. All rights reserved.
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={4} />
    </Grid>
  );
};

export default Footer;
