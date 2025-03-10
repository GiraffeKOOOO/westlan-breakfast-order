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
import { useSnackbar } from 'notistack';
import { HashLoader } from 'react-spinners';
// queries
import useLockedStatus from '../../Queries/useLockedStatus';
import useOrder from '../../Queries/useOrder';
// files
import { basicOrderType, PanelContentProps } from '../../Context/Types';
import TableContent from './TableContent';
import LockButtonContent from './LockButtonContent';
import COLOURS from '../../Theme/Colours';
import AttendeeSummaryTableHeader from './AttendeeSummaryTableHeader';
import OrderSummaryTableHeader from './OrderSummaryTableHeader';
import BREAKFAST_OPTIONS from '../BreakfastOptions';

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

const AdminPanelContent: FC<PanelContentProps> = ({ userName }) => {
  const navigate = useNavigate();
  const {
    allOrdersData: allOrders,
    allOrdersLength,
    isLoadingAllOrders,
    updateOrder,
    forceInvalidate: forceInvalidateOrders,
  } = useOrder(userName);
  const {
    data: lockedStatusData,
    updateLockedStatus,
    forceInvalidate: forceInvalidateLockStatus,
  } = useLockedStatus();
  const { enqueueSnackbar } = useSnackbar();
  const [useColourMode, setUseColourMode] = useState<boolean>(false);
  const [useColourModeWholeRow, setUseColourModeWholeRow] = useState<boolean>(false);
  const [strikethrough, setStrikethrough] = useState<boolean>(false);
  const [loadingSpinner, setLoadingSpinner] = useState<boolean>(false);
  const [stateTableData, setStateTableData] = useState<basicOrderType[]>([]);
  const lockedStatus = lockedStatusData[0].value;
  // TODO: this needs to be updated somehow better than manually defined in .env
  const attendeeTotal: number = import.meta.env.VITE_ATTENDEE_COUNT;
  const ordersMissing: number = attendeeTotal - allOrdersLength;
  let fatBastardCount: number = 0;
  let sausageBaconCount: number = 0;
  let sausageEggCount: number = 0;
  let eggBaconCount: number = 0;
  let onlyBaconCount: number = 0;
  let onlySausageCount: number = 0;
  let onlyEggCount: number = 0;

  const orderTypeCountSwitch = (type: string) => {
    switch (type) {
      case BREAKFAST_OPTIONS.FAT_BASTARD:
        fatBastardCount += 1;
        break;
      case BREAKFAST_OPTIONS.SAUSAGE_AND_BACON:
        sausageBaconCount++;
        break;
      case BREAKFAST_OPTIONS.SAUSAGE_AND_EGG:
        sausageEggCount++;
        break;
      case BREAKFAST_OPTIONS.EGG_AND_BACON:
        eggBaconCount++;
        break;
      case BREAKFAST_OPTIONS.ONLY_BACON:
        onlyBaconCount++;
        break;
      case BREAKFAST_OPTIONS.ONLY_SAUSAGE:
        onlySausageCount++;
        break;
      case BREAKFAST_OPTIONS.ONLY_EGG:
        onlyEggCount++;
        break;
    }
  };

  if (allOrdersLength > 0) {
    stateTableData.forEach((order: unknown) => {
      orderTypeCountSwitch((order as basicOrderType).orderType);
    });
  }

  useEffect(() => {
    if (allOrders !== undefined) {
      setStateTableData(allOrders);
    }
  }, [allOrders, stateTableData]);

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
        paddingBottom: '3rem',
      }}
    >
      {/* left column of the page */}
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

      {/* centre column of the page */}
      <Grid item xs={8} sx={{ marginTop: '2rem' }}>
        {/* 1st table - attendee summary */}
        <TableContainer
          sx={{
            padding: '2rem',
            backgroundColor: COLOURS.DARK_BUTTON_HOVER_BACKGROUND,
            borderRadius: '1rem',
            marginBottom: '2rem',
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
              Attendee Summary
            </Typography>
            <Table>
              <AttendeeSummaryTableHeader />
              <TableBody
                sx={{
                  backgroundColor: COLOURS.DARK_TABLE_CELL_BACKGROUND,
                }}
              >
                <StyledTableRow>
                  <StyledTableCell1 align="center">{attendeeTotal}</StyledTableCell1>
                  <StyledTableCell1 align="center">{allOrdersLength}</StyledTableCell1>
                  <StyledTableCell1 align="center">{ordersMissing.toString()}</StyledTableCell1>
                </StyledTableRow>
              </TableBody>
            </Table>
          </Stack>

          {/* 2nd table - Order summary */}
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
              Order Summary
            </Typography>
            <Table>
              <OrderSummaryTableHeader />
              <TableBody
                sx={{
                  backgroundColor: COLOURS.DARK_TABLE_CELL_BACKGROUND,
                }}
              >
                <StyledTableRow>
                  <StyledTableCell1 align="center">{fatBastardCount}</StyledTableCell1>
                  <StyledTableCell1 align="center">{sausageBaconCount}</StyledTableCell1>
                  <StyledTableCell1 align="center">{sausageEggCount}</StyledTableCell1>
                  <StyledTableCell1 align="center">{eggBaconCount}</StyledTableCell1>
                  <StyledTableCell1 align="center">{onlyBaconCount}</StyledTableCell1>
                  <StyledTableCell1 align="center">{onlySausageCount}</StyledTableCell1>
                  <StyledTableCell1 align="center">{onlyEggCount}</StyledTableCell1>
                </StyledTableRow>
              </TableBody>
            </Table>
          </Stack>
        </TableContainer>

        {/* 3rd table - order list */}
        <TableContainer
          sx={{
            padding: '2rem',
            backgroundColor: COLOURS.DARK_BUTTON_HOVER_BACKGROUND,
            borderRadius: '1rem',
          }}
        >
          {/* Table title */}
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

            {/*  table colour controls */}
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Stack direction="row">
                  {/* checkbox 1 */}
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
                  {/* checkbox 2 */}
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
                  {/* checkbox 3 */}
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
              </Grid>

              {/* order status | right hand side */}
              <Grid item>
                <Typography>Order status: {lockedStatus ? 'locked' : 'unlocked'}</Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    updateLockedStatus(lockedStatus);
                    setLoadingSpinner(true);
                    setTimeout(() => {
                      forceInvalidateLockStatus();
                      setLoadingSpinner(false);
                      enqueueSnackbar(`Orders are now ${!lockedStatus ? 'locked' : 'unlocked'}`, {
                        variant: 'info',
                      });
                    }, 1000);
                  }}
                >
                  {loadingSpinner ? (
                    <HashLoader color="white" size={24} />
                  ) : (
                    <LockButtonContent lockStatus={lockedStatus} />
                  )}
                </Button>
              </Grid>
            </Grid>
          </Stack>

          {!isLoadingAllOrders && allOrders && allOrders.length > 0 ? (
            // Dynamic table with orders
            <TableContent
              orderList={stateTableData}
              setStateTableData={setStateTableData}
              updateOrder={updateOrder}
              forceInvalidate={forceInvalidateOrders}
              useColourMode={useColourMode}
              useColourModeWholeRow={useColourModeWholeRow}
              strikethrough={strikethrough}
            />
          ) : (
            // Empty display when no orders
            <Table>
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
            </Table>
          )}
        </TableContainer>
      </Grid>

      {/* right column of the page */}
      <Grid item xs={2} />
    </Grid>
  );
};

export default AdminPanelContent;
