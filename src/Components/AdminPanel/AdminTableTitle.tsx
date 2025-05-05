// libraries
import { FC } from 'react';
import { Typography } from '@mui/material';
// files
import COLOURS from '../../Theme/Colours';

type AdminTableTitleProps = {
  text: string;
};

const AdminTableTitle: FC<AdminTableTitleProps> = ({ text }) => {
  return (
    <Typography
      sx={{
        display: 'flex',
        color: COLOURS.DARK_FONT_PRIMARY,
        fontSize: '1.25rem',
        lineHeight: '1.75rem',
        fontWeight: '700',
        paddingY: '0.5rem',
        textSizeAdjust: '100%',
      }}
    >
      {text}
    </Typography>
  );
};

export default AdminTableTitle;
