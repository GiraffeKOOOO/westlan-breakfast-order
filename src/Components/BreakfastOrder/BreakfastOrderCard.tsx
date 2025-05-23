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
  Box,
} from '@mui/material';
import { HashLoader } from 'react-spinners';
import { useSnackbar } from 'notistack';
// files
import { BreakfastOption } from '../../Context/Types';
import { Order } from '../../Context/Types';
import breakfastImageSwitch from './breakfastImageSwitch';
import breakfastIngredientIconSwitch from './breakfastIngredientIconSwitch';
import COLOURS from '../../Theme/Colours';

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

  const cardImageSwitch = useCallback((colour: string) => {
    return breakfastImageSwitch(colour);
  }, []);

  const ingredientIconSwitch = useCallback((ingredient: string) => {
    return breakfastIngredientIconSwitch(ingredient);
  }, []);

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

  // TODO: would be neat to correct the random button heights
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
        <Box sx={{ backgroundColor: COLOURS.DARKEN_OVERLAY_STRONG, zIndex: 1 }}>
          <CardMedia>
            <Box
              sx={{
                height: '8.75rem',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${cardImageSwitch(breakfastOption.colour)})`,
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
            <Box sx={{ zIndex: 0 }}>
              <Typography variant="h5">{breakfastOption.name}</Typography>
              <List sx={{ paddingTop: 0 }}>
                {breakfastOption.ingredients.map((ingredient, index) => (
                  <ListItem key={index} sx={{ justifyContent: 'center' }}>
                    {ingredientIconSwitch(ingredient)}
                    <Typography>{ingredient}</Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box
              sx={{
                zIndex: 1,
                position: 'relative',
                width: isMobile ? '16rem' : '20rem',
                height: '19.125rem',
                top: isMobile ? '-8.5rem' : '-10rem',
              }}
            >
              {loadingSpinner ? (
                <Box
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
                </Box>
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
            </Box>
          </CardContent>
        </Box>
      </Card>
    );

  return (
    <Box onClick={() => (lockedStatus ? () => {} : checkShowConfirmation(breakfastOption))}>
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
          image={cardImageSwitch(
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
                {ingredientIconSwitch(ingredient)}
                <Box sx={{ width: '0.6rem' }} />
                <Typography color="text.secondary">{ingredient}</Typography>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BreakfastOrderCard;
