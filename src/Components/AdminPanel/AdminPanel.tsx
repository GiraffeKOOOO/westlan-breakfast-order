// libraries
import { FC, useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
// providers
// files
import MockLanOrderList from '../../MockLanOrderList';
import COLOURS from '../../Theme/Colours';
import TableContent from './TableContent';
// styles

type Order = {
  orderId: number;
  userName: string;
  orderType: string;
  completed: boolean;
};

export const StyledTableCell1 = styled(TableCell)(() => ({
  // table head styling
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: COLOURS.DARK_SECONDARY,
    color: COLOURS.DARK_BUTTON_PRIMARY,
    fontWeight: '600',
    fontSize: '14px',
    top: '-2.1rem',
  },
  // table body styling
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: COLOURS.DARK_TABLE_FONT,
  },
}));

export const StyledTableRow = styled(TableRow)(() => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// const checkboxChangeHandler = useCallback(
//   (orderIdParam: number) => {
//     if (!stateOrderList) return;

//     const updatedArray = [...stateOrderList];
//     updatedArray[orderIdParam].completed = !updatedArray[orderIdParam].completed;

//     setStateOrderList(updatedArray);
//   },
//   [stateOrderList],
// );

const AdminPanel: FC = () => {
  const navigate = useNavigate();
  const [useColourMode, setUseColourMode] = useState<boolean>(false);
  const [useColourModeWholeRow, setUseColourModeWholeRow] = useState<boolean>(false);
  const [strikethrough, setStrikethrough] = useState<boolean>(true);
  const [stateOrderList, setStateOrderList] = useState<Order[] | null>(null);

  useEffect(() => {
    setStateOrderList(MockLanOrderList);
  }, []);

  const colourModeChangeHandler = () => {
    if (useColourMode === false) {
      setUseColourMode(true);
    }
    if (useColourMode && useColourModeWholeRow) {
      setUseColourModeWholeRow(false);
      setUseColourMode(false);
    }
    if (useColourMode) {
      setUseColourMode(false);
    }
  };

  return (
    <Grid
      container
      sx={{
        width: '100vw',
        maxWidth: '100vw',
        backgroundColor: COLOURS.DARK_MODE_BUTTON_LIGHT,
        paddingBottom: '3rem',
      }}
    >
      <Grid
        item
        xs={2}
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          marginTop: '1rem',
        }}
      >
        <Button variant="contained" onClick={() => navigate('/')}>
          Order
        </Button>
      </Grid>

      <Grid item xs={8} sx={{ marginTop: '2rem' }}>
        <TableContainer
          sx={{
            padding: '2rem',
            backgroundColor: COLOURS.DARK_BUTTON_HOVER_BACKGROUND,
            borderRadius: '1rem',
            maxHeight: '32rem',
          }}
        >
          <Stack alignItems="flex-start">
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
              Order List
            </Typography>
            <Stack direction="row">
              <FormControlLabel
                sx={{ color: COLOURS.DARK_TABLE_FONT, marginLeft: '0rem' }}
                control={
                  <Checkbox
                    checked={strikethrough}
                    onChange={() => setStrikethrough(!strikethrough)}
                    sx={{
                      marginRight: '0.2rem',
                      color: COLOURS.DARK_TABLE_FONT,
                      padding: 0,
                      '&.Mui-checked': {
                        color: COLOURS.DARK_TABLE_FONT,
                      },
                    }}
                  />
                }
                label="Strikethrough on complete"
              />
              <FormControlLabel
                sx={{ color: COLOURS.DARK_TABLE_FONT, marginLeft: '0rem' }}
                control={
                  <Checkbox
                    checked={useColourMode}
                    onChange={() => colourModeChangeHandler()}
                    sx={{
                      marginRight: '0.2rem',
                      color: COLOURS.DARK_TABLE_FONT,
                      padding: 0,
                      '&.Mui-checked': {
                        color: COLOURS.DARK_TABLE_FONT,
                      },
                    }}
                  />
                }
                label="Order Type Colours"
              />
              {useColourMode && (
                <FormControlLabel
                  sx={{ color: COLOURS.DARK_TABLE_FONT, marginLeft: '0rem' }}
                  control={
                    <Checkbox
                      checked={useColourModeWholeRow}
                      onChange={() => setUseColourModeWholeRow(!useColourModeWholeRow)}
                      sx={{
                        marginRight: '0.2rem',
                        color: COLOURS.DARK_TABLE_FONT,
                        padding: 0,
                        '&.Mui-checked': {
                          color: COLOURS.DARK_TABLE_FONT,
                        },
                      }}
                    />
                  }
                  label="Whole Row"
                />
              )}
            </Stack>
          </Stack>

          <Table sx={{ marginTop: '1rem' }} stickyHeader>
            {stateOrderList && stateOrderList.length > 0 ? (
              <TableContent
                useColourMode={useColourMode}
                useColourModeWholeRow={useColourModeWholeRow}
                strikethrough={strikethrough}
              />
            ) : (
              <TableBody
                sx={{
                  backgroundColor: COLOURS.DARK_TABLE_CELL_BACKGROUND,
                }}
              >
                <StyledTableRow>
                  <StyledTableCell1 component="th" scope="row">
                    No Orders available
                  </StyledTableCell1>
                  <StyledTableCell1 />
                  <StyledTableCell1 />
                  <StyledTableCell1 />
                </StyledTableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={2} />
    </Grid>
  );
};

export default AdminPanel;
