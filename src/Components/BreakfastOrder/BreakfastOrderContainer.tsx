// libraries
import { FC, useState } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
// providers
// files
import BreakfastOrderCard from './BreakfastOrderCard';
import COLOURS from '../../Theme/Colours';
// styles

export type BreakfastOption = {
  name: string;
  ingredients: string[];
  colour: string;
};

const breakfastOptions: BreakfastOption[] = [
  { name: 'Fat Bastard', ingredients: ['Sausage', 'Bacon', 'Egg'], colour: 'blue' },
  { name: 'Sausage & Bacon', ingredients: ['Sausage', 'Bacon'], colour: 'orange' },
  { name: 'Sausage & Egg', ingredients: ['Sausage', 'Egg'], colour: 'purple' },
  { name: 'Egg & Bacon', ingredients: ['Bacon', 'Egg'], colour: 'green' },
  { name: 'Only Bacon', ingredients: ['Bacon'], colour: 'yellow' },
  { name: 'Only Sausage', ingredients: ['Sausage'], colour: 'pink' },
  { name: 'Only Egg', ingredients: ['Egg'], colour: 'white' },
];

const BreakfastOrderContainer: FC = () => {
  const [userSelection, setUserSelection] = useState<BreakfastOption | null>(null);
  const [editing, setEditing] = useState<boolean>(false);

  return (
    <Grid container sx={{ width: '100vw', maxWidth: '100vw' }}>
      <Grid item xs={2} />
      <Grid item xs={8} sx={{ marginTop: '1.5rem', width: '100vw', maxWidth: '100vw' }}>
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
      <Grid item xs={2} />
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
