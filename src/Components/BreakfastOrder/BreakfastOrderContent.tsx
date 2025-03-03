// libraries
import { FC, useMemo, useState } from 'react';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RiseLoader } from 'react-spinners';
// queries
import useOrder from '../../Queries/useOrder';
// files
import COLOURS from '../../Theme/Colours';
import BreakfastOrderCard from './BreakfastOrderCard';
import BreakfastOptions from './BreakfastOrderOptions';

type BreakfastOrderContentProps = {
  darkMode: boolean;
  userName: string;
  userDiscordId: string;
  lockedStatus: boolean;
};

const BreakfastOrderContent: FC<BreakfastOrderContentProps> = ({
  darkMode,
  userName,
  userDiscordId,
  lockedStatus,
}) => {
  const navigate = useNavigate();
  const breakfastOptions = BreakfastOptions;
  const {
    data: order,
    isLoading,
    createOrder,
    updateOrder,
    forceInvalidate,
    updatePending,
  } = useOrder(userName);
  const [editing, setEditing] = useState<boolean>(false);
  const [loadingSpinner, setLoadingSpinner] = useState<boolean>(false);
  const orderSelected = order !== undefined && order !== null;

  const orderText = useMemo(() => {
    if (!updatePending && !loadingSpinner) {
      return order?.orderType;
    } else {
      return <RiseLoader color={`${darkMode ? 'white' : 'black'}`} />;
    }
  }, [darkMode, loadingSpinner, order?.orderType, updatePending]);

  return (
    <>
      <Grid
        container
        sx={{
          width: '100vw',
          maxWidth: '100vw',
          backgroundColor: darkMode ? COLOURS.DARK_MODE_BUTTON_LIGHT : COLOURS.LIGHT_SECONDARY,
          paddingBottom: '2rem',
        }}
      >
        <Grid item xs={2} />
        <Grid item xs={8} sx={{ paddingTop: '1.5rem', width: '100vw', maxWidth: '100vw' }}>
          {orderSelected && !isLoading ? (
            <Stack direction="row" justifyContent="center" flexWrap="wrap">
              <Typography
                sx={{
                  color: darkMode ? COLOURS.DARK_FONT_PRIMARY : COLOURS.LIGHT_FONT_PRIMARY,
                  fontSize: {
                    xs: '1.3rem',
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
                You have selected
              </Typography>
              <Typography
                sx={{
                  color: darkMode ? COLOURS.DARK_FONT_PRIMARY : COLOURS.LIGHT_FONT_PRIMARY,
                  fontSize: {
                    xs: '1.3rem',
                    sm: '1.6rem',
                    md: '2rem',
                    lg: '2rem',
                  },
                  lineHeight: '1.25rem',
                  fontWeight: '500',
                  paddingY: '0.5rem',
                  textSizeAdjust: '100%',
                }}
              >
                {orderText}
              </Typography>
            </Stack>
          ) : (
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
              Please select a breakfast bap
            </Typography>
          )}
        </Grid>
        <Grid item xs={2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
          {(userDiscordId === `${import.meta.env.VITE_STAFF_1_ID}` ||
            userDiscordId === `${import.meta.env.VITE_STAFF_2_ID}` ||
            userDiscordId === `${import.meta.env.VITE_STAFF_3_ID}` ||
            userDiscordId === `${import.meta.env.VITE_STAFF_4_ID}`) && (
            <Button variant="contained" onClick={() => navigate('/admin')}>
              Admin Panel
            </Button>
          )}
        </Grid>
        <Grid item xs={0} sm={2} />
        <Grid item xs={12} sm={8}>
          <Stack direction="row" justifyContent="center" flexWrap="wrap">
            {breakfastOptions.map((breakfastOption, iterator) => (
              <BreakfastOrderCard
                key={iterator.toString()}
                darkMode={darkMode}
                lockedStatus={lockedStatus}
                editing={editing}
                setEditing={setEditing}
                breakfastOption={breakfastOption}
                userName={userName}
                orderSelected={orderSelected}
                order={order}
                createOrder={createOrder}
                updateOrder={updateOrder}
                forceInvalidate={forceInvalidate}
                loadingSpinner={loadingSpinner}
                setLoadingSpinner={setLoadingSpinner}
              />
            ))}
          </Stack>
        </Grid>
        <Grid item xs={0} sm={2} />
      </Grid>
    </>
  );
};

export default BreakfastOrderContent;
