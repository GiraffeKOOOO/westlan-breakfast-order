// libraries
import { FC } from 'react';
import { Typography } from '@mui/material';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

type LockButtonContentProps = {
  lockStatus: boolean;
};

const LockButtonContent: FC<LockButtonContentProps> = ({ lockStatus }) => {
  if (lockStatus) {
    return (
      <>
        <LockOpenOutlinedIcon fontSize="small" />
        <Typography fontSize={14} sx={{ marginTop: '0.2rem', marginLeft: '0.2rem' }}>
          Unlock Orders
        </Typography>
      </>
    );
  }
  return (
    <>
      <LockOutlinedIcon fontSize="small" />
      <Typography fontSize={14} sx={{ marginTop: '0.2rem', marginLeft: '0.2rem' }}>
        Lock Orders
      </Typography>
    </>
  );
};

export default LockButtonContent;
