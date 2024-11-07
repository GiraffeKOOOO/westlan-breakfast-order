// libraries
import { FC, useContext, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// providers
import UserContext from '../../Context/UserContext';
import OrderContext from '../../Context/OrderContext';
// files
import BreakfastOrderCard from './BreakfastOrderCard';
import COLOURS from '../../Theme/Colours';
import userType from '../../Context/UserTypes';
import BreakfastOptions from './BreakfastOrderOptions';
// styles

export type BreakfastOption = {
  name: string;
  ingredients: string[];
  colour: string;
};

const fetchOrder = (userName: string) => {
  try {
    axios
      .get(`${import.meta.env.VITE_API_ADDRESS}Order/${userName}`)
      .then((response) => setUserOrder(response))
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

const fetchLockedStatus = (setLockedStatus: Dispatch<SetStateAction<boolean>>) => {
  try {
    axios.get(`${import.meta.env.VITE_API_ADDRESS}LockedStatus`).then((response) => {
      setLockedStatus(response.data[0].value);
    });
  } catch (error) {
    console.log(error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setUserOrder = (response: any) => {
  localStorage.setItem('orderId', response.data.orderId);
  localStorage.setItem('userName', response.data.userName);
  localStorage.setItem('orderType', response.data.orderType);
  localStorage.setItem('completed', response.data.completed);
};

const BreakfastOrderContainer: FC = () => {
  const navigate = useNavigate();
  const { userRole, userId, userName } = useContext(UserContext);
  const { orderId, orderType, completed } = useContext(OrderContext);
  const [lockedStatus, setLockedStatus] = useState(false);
  const [editing, setEditing] = useState<boolean>(false);
  const breakfastOptions = BreakfastOptions;

  const userLoggedIn = userId !== undefined && userName !== undefined && userRole !== undefined;
  const orderSelected = orderId !== -1 && orderType !== '';

  useEffect(() => {
    fetchLockedStatus(setLockedStatus);
    if (userLoggedIn) {
      fetchOrder(userName);
    }
  }, [userLoggedIn, userName]);

  return (
    <Grid
      container
      sx={{
        width: '100vw',
        maxWidth: '100vw',
        backgroundColor: COLOURS.DARK_MODE_BUTTON_LIGHT,
        paddingBottom: '2rem',
      }}
    >
      <Grid item xs={2} />
      <Grid item xs={8} sx={{ paddingTop: '1.5rem', width: '100vw', maxWidth: '100vw' }}>
        {userLoggedIn ? (
          orderSelected ? (
            <Typography
              sx={{
                color: COLOURS.DARK_FONT_PRIMARY,
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
              You have selected: {orderType}
            </Typography>
          ) : (
            <Typography
              sx={{
                color: COLOURS.DARK_FONT_PRIMARY,
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
          )
        ) : (
          <Typography
            sx={{
              color: COLOURS.DARK_FONT_PRIMARY,
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
            Please log in to get started
          </Typography>
        )}
      </Grid>
      <Grid item xs={2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
        {userRole === userType.admin && (
          <Button variant="contained" onClick={() => navigate('/admin')}>
            Admin Panel
          </Button>
        )}
      </Grid>
      <Grid item xs={0} sm={2} />
      <Grid item xs={12} sm={8}>
        <Stack direction="row" justifyContent="center" flexWrap="wrap">
          {userLoggedIn &&
            breakfastOptions.map((breakfastOption, iterator) => (
              <BreakfastOrderCard
                key={iterator.toString()}
                editing={editing}
                setEditing={setEditing}
                orderSelected={orderSelected}
                orderType={orderType}
                breakfastOption={breakfastOption}
                userName={userName}
                orderId={orderId}
                completed={completed}
                lockedStatus={lockedStatus}
              />
            ))}
        </Stack>
      </Grid>
      <Grid item xs={0} sm={2} />
    </Grid>
  );
};

export default BreakfastOrderContainer;
