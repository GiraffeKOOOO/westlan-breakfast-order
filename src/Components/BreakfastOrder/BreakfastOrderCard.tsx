// libraries
import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react';
import { Button, Card, CardContent, CardMedia, List, ListItem, Typography } from '@mui/material';
import { BsEggFried } from 'react-icons/bs';
import { GiSausage } from 'react-icons/gi';
import { FaBacon } from 'react-icons/fa';
// providers
// files
import burgerBlue from '../../assets/burger-blue.png';
import burgerGreen from '../../assets/burger-green.png';
import burgerOrange from '../../assets/burger-orange.png';
import burgerPink from '../../assets/burger-pink.png';
import burgerPurple from '../../assets/burger-purple.png';
import burgerWhite from '../../assets/burger-white.png';
import burgerYellow from '../../assets/burger-yellow.png';

import { BreakfastOption } from './BreakfastOrderContainer';
import COLOURS from '../../Theme/Colours';
// styles

type BreakfastOrderCardProps = {
  editing: boolean;
  setEditing: Dispatch<SetStateAction<boolean>>;
  userSelection: BreakfastOption | null;
  setUserSelection: Dispatch<SetStateAction<BreakfastOption | null>>;
  breakfastOption: BreakfastOption;
};

const BreakfastOrderCard: FC<BreakfastOrderCardProps> = ({
  editing,
  setEditing,
  userSelection,
  setUserSelection,
  breakfastOption,
}) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const iconSwitch = useCallback((ingredient: string) => {
    switch (ingredient) {
      case 'Sausage':
        return <GiSausage style={{ fontSize: '1.5rem' }} />;
      case 'Bacon':
        return <FaBacon style={{ fontSize: '1.5rem' }} />;
      case 'Egg':
        return <BsEggFried style={{ fontSize: '1.5rem' }} />;
      default:
    }
  }, []);

  const colourSwitch = useCallback((colour: string) => {
    switch (colour) {
      case 'orange':
        return burgerOrange;
      case 'blue':
        return burgerBlue;
      case 'purple':
        return burgerPurple;
      case 'green':
        return burgerGreen;
      case 'yellow':
        return burgerYellow;
      case 'pink':
        return burgerPink;
      case 'white':
        return burgerWhite;
      default:
        return burgerOrange;
    }
  }, []);

  const checkShowConfirmation = useCallback(
    (breakfastOption: BreakfastOption) => {
      if (breakfastOption === userSelection) return;

      if (editing) {
        setShowConfirmation(false);
        return;
      } else {
        setShowConfirmation(true);
        setEditing(true);
        return;
      }
    },
    [editing, setEditing, userSelection],
  );

  const handleUserSelection = useCallback(
    (breakfastOption: BreakfastOption) => {
      setUserSelection(breakfastOption);
      setShowConfirmation(false);
      setEditing(false);
      // call the API
    },
    [setEditing, setUserSelection],
  );

  if (showConfirmation)
    return (
      <Card
        sx={{
          zIndex: 1,
          width: '20rem',
          minHeight: '19.125rem',
          maxHeight: '19.125rem',
          marginY: '2rem',
          marginX: '1rem',
          borderRadius: '6%',
          border: `0.3rem solid ${COLOURS.TRANSPARENT}`,
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
              <Typography variant="body2" color="text.secondary">
                <List sx={{ paddingTop: 0 }}>
                  {breakfastOption.ingredients.map((ingredient, index) => (
                    <ListItem key={index} sx={{ justifyContent: 'center' }}>
                      {iconSwitch(ingredient)}
                      <div style={{ width: '0.6rem' }} />
                      <Typography>{ingredient}</Typography>
                    </ListItem>
                  ))}
                </List>
              </Typography>
            </div>
            <div
              style={{
                zIndex: 1,
                position: 'relative',
                width: '20rem',
                height: '19.125rem',
                top: '-10rem',
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
    <div onClick={() => checkShowConfirmation(breakfastOption)}>
      <Card
        sx={{
          width: '20rem',
          minHeight: '19.125rem',
          marginY: '2rem',
          marginX: '1rem',
          borderRadius: '6%',
          border:
            breakfastOption === userSelection
              ? `0.3rem solid ${COLOURS.BREAKFAST_OPTION_CARD_SELECTED}`
              : `0.3rem solid ${COLOURS.TRANSPARENT}`,
          '&:hover': {
            border:
              breakfastOption === userSelection
                ? `0.3rem solid ${COLOURS.BREAKFAST_OPTION_CARD_SELECTED}`
                : `0.3rem solid ${COLOURS.BREAKFAST_OPTION_CARD_HOVER}`,
          },
        }}
      >
        <CardMedia sx={{ height: '8.75rem' }} image={colourSwitch(breakfastOption.colour)} />
        <CardContent
          sx={{
            padding: '0.4rem',
            '&:last-child': {
              paddingBottom: 0,
            },
          }}
        >
          <Typography variant="h5">{breakfastOption.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            <List sx={{ paddingTop: 0 }}>
              {breakfastOption.ingredients.map((ingredient) => (
                <ListItem sx={{ justifyContent: 'center' }}>
                  {iconSwitch(ingredient)}
                  <div style={{ width: '0.6rem' }} />
                  <Typography>{ingredient}</Typography>
                </ListItem>
              ))}
            </List>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default BreakfastOrderCard;
