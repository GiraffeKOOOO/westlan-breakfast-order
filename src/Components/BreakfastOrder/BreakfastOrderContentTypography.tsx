// libraries
import { FC } from 'react';
import { Typography } from '@mui/material';
// files
import COLOURS from '../../Theme/Colours';

type BreakfastOrderContentTypographyProps = {
  darkMode: boolean;
  text: string;
};

const BreakfastOrderContentTypography: FC<BreakfastOrderContentTypographyProps> = ({
  darkMode,
  text,
}) => {
  return (
    <Typography
      sx={{
        color: darkMode ? COLOURS.DARK_FONT_PRIMARY : COLOURS.LIGHT_FONT_PRIMARY,
        fontSize: {
          xs: '1.4rem',
          sm: '1.6rem',
          md: '2rem',
          lg: '2rem',
        },
        lineHeight: '1.25rem',
        fontWeight: '500',
        paddingY: '0.5rem',
        paddingX: '0.75rem',
        textSizeAdjust: '100%',
      }}
    >
      {text}
    </Typography>
  );
};

export default BreakfastOrderContentTypography;
