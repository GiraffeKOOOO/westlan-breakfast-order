/* eslint-disable @typescript-eslint/no-explicit-any */
// libraries
import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Typography,
  useMediaQuery,
  useTheme as muiTheme,
} from '@mui/material';
import { BsEggFried } from 'react-icons/bs';
import { GiSausage } from 'react-icons/gi';
import { FaBacon } from 'react-icons/fa';
import axios from 'axios';
// providers
import { useTheme } from '../../Context/useTheme';
// files
import burgerBlue from '../../assets/burger-blue.png';
import burgerGreen from '../../assets/burger-green.png';
import burgerOrange from '../../assets/burger-orange.png';
import burgerPink from '../../assets/burger-pink.png';
import burgerPurple from '../../assets/burger-purple.png';
import burgerWhite from '../../assets/burger-white.png';
import burgerYellow from '../../assets/burger-yellow.png';
import burgerGrey from '../../assets/burger-grey.png';
import { BreakfastOption } from './BreakfastOrderContainer';
import { BREAKFAST_INGREDIENTS, BREAKFAST_OPTION_COLOURS } from '../BreakfastOptions';
import COLOURS from '../../Theme/Colours';
// styles

type BreakfastOrderCardProps = {
  editing: boolean;
  setEditing: Dispatch<SetStateAction<boolean>>;
  orderSelected: boolean;
  orderType: string;
  breakfastOption: BreakfastOption;
  userName: string;
  completed: boolean;
  lockedStatus: boolean;
};

const updateUserOrder = (response: any, data: any) => {
  if (response.status !== 200) return;

  localStorage.setItem('userName', data.userName);
  localStorage.setItem('orderType', data.orderType);
  localStorage.setItem('completed', data.completed);

  window.location.reload();
};

const updateOrderCall = (
  userName: string,
  breakfastOption: BreakfastOption,
  completed: boolean,
) => {
  const newData = {
    userName: userName,
    orderType: breakfastOption.name,
    completed: completed,
  };
  try {
    axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_API_ADDRESS}Order`,
      headers: {
        'content-type': 'application/json',
      },
      data: newData,
    })
      .then((response) => updateUserOrder(response, newData))
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

const createOrderCall = (userName: string, breakfastOption: BreakfastOption) => {
  const newData = {
    userName: userName,
    orderType: breakfastOption.name,
    completed: false,
  };
  try {
    axios({
      method: 'POST',
      url: `${import.meta.env.VITE_API_ADDRESS}Order`,
      headers: {
        'content-type': 'application/json',
      },
      data: newData,
    })
      .then((response) => updateUserOrder(response, newData))
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

const BreakfastOrderCard: FC<BreakfastOrderCardProps> = ({
  editing,
  setEditing,
  orderSelected,
  orderType,
  breakfastOption,
  userName,
  completed,
  lockedStatus,
}) => {
  const { darkMode } = useTheme();
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const theme = muiTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const iconSwitch = useCallback((ingredient: string) => {
    switch (ingredient) {
      case BREAKFAST_INGREDIENTS.SAUSAGE:
        return <GiSausage style={{ fontSize: '1.5rem' }} />;
      case BREAKFAST_INGREDIENTS.BACON:
        return <FaBacon style={{ fontSize: '1.5rem' }} />;
      case BREAKFAST_INGREDIENTS.EGG:
        return <BsEggFried style={{ fontSize: '1.5rem' }} />;
      default:
    }
  }, []);

  const colourSwitch = useCallback((colour: string) => {
    switch (colour) {
      case BREAKFAST_OPTION_COLOURS.SAUSAGE_AND_BACON:
        return burgerOrange;
      case BREAKFAST_OPTION_COLOURS.FAT_BASTARD:
        return burgerBlue;
      case BREAKFAST_OPTION_COLOURS.SAUSAGE_AND_EGG:
        return burgerPurple;
      case BREAKFAST_OPTION_COLOURS.EGG_AND_BACON:
        return burgerGreen;
      case BREAKFAST_OPTION_COLOURS.ONLY_BACON:
        return burgerYellow;
      case BREAKFAST_OPTION_COLOURS.ONLY_SAUSAGE:
        return burgerPink;
      case BREAKFAST_OPTION_COLOURS.ONLY_EGG:
        return burgerWhite;
      case 'DISABLED':
        return burgerGrey;
      default:
        return burgerOrange;
    }
  }, []);

  const checkShowConfirmation = useCallback(
    (breakfastOption: BreakfastOption) => {
      if (breakfastOption.name === orderType) return;

      if (editing) {
        setShowConfirmation(false);
        return;
      } else {
        setShowConfirmation(true);
        setEditing(true);
        return;
      }
    },
    [orderType, editing, setEditing],
  );

  const handleUserSelection = useCallback(
    (breakfastOption: BreakfastOption) => {
      setShowConfirmation(false);
      setEditing(false);

      if (orderSelected) {
        updateOrderCall(userName, breakfastOption, completed);
      } else {
        createOrderCall(userName, breakfastOption);
      }
    },
    // eslint-disable-next-line no-sparse-arrays
    [completed, orderSelected, setEditing, , userName],
  );

  if (showConfirmation)
    return (
      <Card
        sx={{
          zIndex: 1,
          width: {
            xs: '16rem',
            sm: '20rem',
          },
          minHeight: '19.125rem',
          maxHeight: '19.125rem',
          marginY: '2rem',
          marginX: '1rem',
          borderRadius: '6%',
          border: darkMode
            ? `0.3rem solid ${COLOURS.TRANSPARENT}`
            : `0.3rem solid ${COLOURS.LIGHT_FONT_TERTIARY}`,
        }}
      >
        <div style={{ backgroundColor: COLOURS.DARKEN_OVERLAY_STRONG, zIndex: 1 }}>
          <CardMedia>
            <div
              style={{
                height: '8.75rem',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${colourSwitch(breakfastOption.colour)})`,
                backgroundBlendMode: 'multiply',
                backgroundColor: COLOURS.DARKEN_OVERLAY_STRONG,
              }}
            />
          </CardMedia>
          <CardContent
            sx={{
              padding: '0.4rem',
              '&:last-child': {
                paddingBottom: 0,
              },
            }}
          >
            <div style={{ zIndex: 0 }}>
              <Typography variant="h5">{breakfastOption.name}</Typography>
              <List sx={{ paddingTop: 0 }}>
                {breakfastOption.ingredients.map((ingredient, index) => (
                  <ListItem key={index} sx={{ justifyContent: 'center' }}>
                    {iconSwitch(ingredient)}
                    <Typography>{ingredient}</Typography>
                  </ListItem>
                ))}
              </List>
            </div>
            <div
              style={{
                zIndex: 1,
                position: 'relative',
                width: isMobile ? '16rem' : '20rem',
                height: '19.125rem',
                top: isMobile ? '-8.5rem' : '-10rem',
              }}
            >
              <Typography
                sx={{
                  color: COLOURS.DARK_FONT_PRIMARY,
                  fontSize: '1.1rem',
                  lineHeight: '1.25rem',
                  fontWeight: '500',
                  paddingY: '0.2rem',
                  textSizeAdjust: '100%',
                }}
              >
                Would you like to select this bap?
              </Typography>
              <Button
                variant="contained"
                sx={{
                  zIndex: 1,
                  position: 'relative',
                  margin: '0.5rem',
                  backgroundColor: COLOURS.CANCEL_BUTTON,
                  '&:hover': {
                    backgroundColor: COLOURS.CANCEL_BUTTON_HOVER,
                  },
                }}
                onClick={() => {
                  setShowConfirmation(false);
                  setEditing(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ zIndex: 1, position: 'relative', margin: '0.5rem' }}
                onClick={() => handleUserSelection(breakfastOption)}
              >
                Confirm
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    );

  return (
    <div onClick={() => (lockedStatus ? () => {} : checkShowConfirmation(breakfastOption))}>
      <Card
        sx={{
          width: {
            xs: '16rem',
            sm: '20rem',
          },
          minHeight: '19.125rem',
          marginY: '2rem',
          marginX: '1rem',
          borderRadius: '6%',
          border:
            breakfastOption.name === orderType
              ? `0.3rem solid ${COLOURS.BREAKFAST_OPTION_CARD_SELECTED}`
              : `0.3rem solid ${darkMode ? COLOURS.TRANSPARENT : COLOURS.LIGHT_FONT_TERTIARY}`,
          '&:hover': {
            border:
              breakfastOption.name === orderType
                ? `0.3rem solid ${COLOURS.BREAKFAST_OPTION_CARD_SELECTED}`
                : `0.3rem solid ${
                    lockedStatus && orderType !== breakfastOption.name
                      ? COLOURS.DARK_FONT_PRIMARY
                      : COLOURS.BREAKFAST_OPTION_CARD_HOVER
                  }`,
          },
        }}
      >
        <CardMedia
          sx={{ height: '8.75rem' }}
          image={colourSwitch(
            lockedStatus && orderType !== breakfastOption.name
              ? 'DISABLED'
              : breakfastOption.colour,
          )}
        />
        <CardContent
          sx={{
            padding: '0.4rem',
            '&:last-child': {
              paddingBottom: 0,
            },
          }}
        >
          <Typography variant="h5">{breakfastOption.name}</Typography>
          <List sx={{ paddingTop: 0 }}>
            {breakfastOption.ingredients.map((ingredient, index) => (
              <ListItem key={index.toString()} sx={{ justifyContent: 'center' }}>
                {iconSwitch(ingredient)}
                <div style={{ width: '0.6rem' }} />
                <Typography color="text.secondary">{ingredient}</Typography>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default BreakfastOrderCard;
