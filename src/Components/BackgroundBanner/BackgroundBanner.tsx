// libraries
import { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
// files
import bannerImage from '../../assets/background-banner.jpg';
import COLOURS from '../../Theme/Colours';

const backgroundImage = {
  backgroundImage: `url(${bannerImage})`,
  height: '300px',
  width: '100vw',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '100% 37%',
};

const darkLayer = {
  height: '300px',
  width: '100vw',
  backgroundColor: COLOURS.DARKEN_OVERLAY,
};

const BackgroundBanner: FC = () => {
  return (
    <Stack sx={{ position: 'static', borderTop: `1px solid ${COLOURS.NAVBAR_BORDER_BOTTOM}` }}>
      <Box sx={backgroundImage}>
        <Box sx={darkLayer}>
          <Typography
            sx={{
              position: 'relative',
              bottom: '-50%',
              color: COLOURS.DARK_FONT_PRIMARY,
              fontSize: {
                xs: '2rem',
                sm: '3rem',
                md: '3.5rem',
                lg: '3.75rem',
              },
              lineHeight: '1.25rem',
              fontWeight: '800',
              letterSpacing: '-1.5px',
            }}
          >
            Breakfast Order
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export default BackgroundBanner;
