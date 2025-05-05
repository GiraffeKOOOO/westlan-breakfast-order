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
import { HashLoader } from 'react-spinners';
import { useSnackbar } from 'notistack';
// files
import { BreakfastOption } from '../../Context/Types';
import { BREAKFAST_INGREDIENTS, BREAKFAST_OPTION_COLOURS } from '../BreakfastOptions';
import { Order } from '../../Context/Types';
import COLOURS from '../../Theme/Colours';
import burgerBlue from '../../assets/burger-blue.png';
import burgerGreen from '../../assets/burger-green.png';
import burgerOrange from '../../assets/burger-orange.png';
import burgerPink from '../../assets/burger-pink.png';
import burgerPurple from '../../assets/burger-purple.png';
import burgerWhite from '../../assets/burger-white.png';
import burgerYellow from '../../assets/burger-yellow.png';
import burgerGrey from '../../assets/burger-grey.png';

type BreakfastOrderCardProps = {
  darkMode: boolean;
  lockedStatus: boolean;
  editing: boolean;
  setEditing: Dispatch<SetStateAction<boolean>>;
  breakfastOption: BreakfastOption;
  userName: string;
  orderSelected: boolean;
  order: Order;
  createOrder: (orderData: { userName: string; orderType: string }) => void;
  updateOrder: (orderData: { userName: string; orderType: string; completed: boolean }) => void;
  forceInvalidate: () => void;
  loadingSpinner: boolean;
  setLoadingSpinner: Dispatch<SetStateAction<boolean>>;
};

const BreakfastOrderCard: FC<BreakfastOrderCardProps> = ({
  darkMode,
  lockedStatus,
  editing,
  setEditing,
  breakfastOption,
  userName,
  orderSelected,
  order,
  createOrder,
  updateOrder,
  forceInvalidate,
  loadingSpinner,
  setLoadingSpinner,
}) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
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

  const colourSwitch = (colour: string) => {
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
  };

  const checkShowConfirmation = (breakfastOption: BreakfastOption) => {
    if (breakfastOption.name === order?.orderType) return;

    if (editing) {
      setShowConfirmation(false);
      return;
    } else {
      setShowConfirmation(true);
      setEditing(true);
      return;
    }
  };

  const handleUserSelection = (breakfastOption: BreakfastOption) => {
    if (!orderSelected) {
      createOrder({ userName, orderType: breakfastOption.name });
    } else {
      updateOrder({
        userName: userName,
        orderType: breakfastOption.name,
        completed: order.completed!,
      });
    }

    setLoadingSpinner(true);
    setTimeout(() => {
      forceInvalidate();
      setShowConfirmation(false);
      setEditing(false);
      setLoadingSpinner(false);
      enqueueSnackbar(`Order ${!orderSelected ? 'Created' : 'Updated'}`, {
        variant: !orderSelected ? 'success' : 'info',
      });
    }, 700);
  };

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
              {loadingSpinner ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    color: '#ffffff',
                  }}
                >
                  <HashLoader
                    color="white"
                    cssOverride={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '-10rem' }}
                  />
                </div>
              ) : (
                <>
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
                </>
              )}
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
            breakfastOption.name === order?.orderType
              ? `0.3rem solid ${COLOURS.BREAKFAST_OPTION_CARD_SELECTED}`
              : `0.3rem solid ${darkMode ? COLOURS.TRANSPARENT : COLOURS.LIGHT_FONT_TERTIARY}`,
          '&:hover': {
            border:
              breakfastOption.name === order?.orderType
                ? `0.3rem solid ${COLOURS.BREAKFAST_OPTION_CARD_SELECTED}`
                : `0.3rem solid ${
                    lockedStatus && order?.orderType !== breakfastOption.name
                      ? COLOURS.DARK_FONT_PRIMARY
                      : COLOURS.BREAKFAST_OPTION_CARD_HOVER
                  }`,
          },
        }}
      >
        <CardMedia
          sx={{ height: '8.75rem' }}
          image={colourSwitch(
            lockedStatus && order?.orderType !== breakfastOption.name
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
