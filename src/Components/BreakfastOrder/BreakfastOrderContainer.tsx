// libraries
import { FC, useState } from 'react';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// providers
// files
import BreakfastOrderCard from './BreakfastOrderCard';
import BREAKFAST_OPTIONS, {
  BREAKFAST_INGREDIENTS,
  BREAKFAST_OPTION_COLOURS,
} from '../BreakfastOptions';
import COLOURS from '../../Theme/Colours';
// styles

export type BreakfastOption = {
  name: string;
  ingredients: string[];
  colour: string;
};

const breakfastOptions: BreakfastOption[] = [
  {
    name: BREAKFAST_OPTIONS.FAT_BASTARD,
    ingredients: [
      BREAKFAST_INGREDIENTS.SAUSAGE,
      BREAKFAST_INGREDIENTS.BACON,
      BREAKFAST_INGREDIENTS.EGG,
    ],
    colour: BREAKFAST_OPTION_COLOURS.FAT_BASTARD,
  },
  {
    name: BREAKFAST_OPTIONS.SAUSAGE_AND_BACON,
    ingredients: [BREAKFAST_INGREDIENTS.SAUSAGE, BREAKFAST_INGREDIENTS.BACON],
    colour: BREAKFAST_OPTION_COLOURS.SAUSAGE_AND_BACON,
  },
  {
    name: BREAKFAST_OPTIONS.SAUSAGE_AND_EGG,
    ingredients: [BREAKFAST_INGREDIENTS.SAUSAGE, BREAKFAST_INGREDIENTS.EGG],
    colour: BREAKFAST_OPTION_COLOURS.SAUSAGE_AND_EGG,
  },
  {
    name: BREAKFAST_OPTIONS.EGG_AND_BACON,
    ingredients: [BREAKFAST_INGREDIENTS.BACON, BREAKFAST_INGREDIENTS.EGG],
    colour: BREAKFAST_OPTION_COLOURS.EGG_AND_BACON,
  },
  {
    name: BREAKFAST_OPTIONS.ONLY_BACON,
    ingredients: [BREAKFAST_INGREDIENTS.BACON],
    colour: BREAKFAST_OPTION_COLOURS.ONLY_BACON,
  },
  {
    name: BREAKFAST_OPTIONS.ONLY_SAUSAGE,
    ingredients: [BREAKFAST_INGREDIENTS.SAUSAGE],
    colour: BREAKFAST_OPTION_COLOURS.ONLY_SAUSAGE,
  },
  {
    name: BREAKFAST_OPTIONS.ONLY_EGG,
    ingredients: [BREAKFAST_INGREDIENTS.EGG],
    colour: BREAKFAST_OPTION_COLOURS.ONLY_EGG,
  },
];

const BreakfastOrderContainer: FC = () => {
  const navigate = useNavigate();
  const [userSelection, setUserSelection] = useState<BreakfastOption | null>(null);
  const [editing, setEditing] = useState<boolean>(false);

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
        {userSelection !== null ? (
          <Typography
            sx={{
              color: COLOURS.DARK_FONT_PRIMARY,
              fontSize: '2rem',
              lineHeight: '1.25rem',
              fontWeight: '500',
              paddingY: '0.5rem',
              paddingX: '0.75rem',
              textSizeAdjust: '100%',
            }}
          >
            You have selected: {userSelection.name}
          </Typography>
        ) : (
          <Typography
            sx={{
              color: COLOURS.DARK_FONT_PRIMARY,
              fontSize: '2rem',
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
        {/* TODO: remove this button once there is user authentication (replace it with a user type check) */}
        <Button variant="contained" onClick={() => navigate('/admin')}>
          Admin Panel
        </Button>
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={8} sx={{ width: '1000px', maxWidth: '1000px' }}>
        <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
          {breakfastOptions.map((breakfastOption) => (
            <BreakfastOrderCard
              editing={editing}
              setEditing={setEditing}
              userSelection={userSelection}
              setUserSelection={setUserSelection}
              breakfastOption={breakfastOption}
            />
          ))}
        </Stack>
      </Grid>
      <Grid item xs={2} />
    </Grid>
  );
};

export default BreakfastOrderContainer;
