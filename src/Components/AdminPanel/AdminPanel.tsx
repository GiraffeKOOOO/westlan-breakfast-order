// libraries
import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';
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
import axios from 'axios';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// providers
import LockedStatusContext from '../../Context/LockedStatusContext';
// files
import COLOURS from '../../Theme/Colours';
import TableContent from './TableContent';
import UserContext from '../../Context/UserContext';
// styles

type Order = {
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

const fetchOrderList = (setStateOrderList: Dispatch<SetStateAction<Order[] | null>>) => {
  try {
    axios
      .get(`${import.meta.env.VITE_API_ADDRESS}Order`)
      .then((response) => setStateOrderList(response.data))
      .catch(() => setStateOrderList(null));
  } catch (error) {
    console.log(error);
  }
};

const fetchLockedStatus = () => {
  try {
    axios.get(`${import.meta.env.VITE_API_ADDRESS}LockedStatus`).then((response) => {
      setLockedStatus(response.data[0].value);
    });
  } catch (error) {
    console.log(error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateLockedStatus = (response: any, data: any) => {
  if (response.status !== 200) return;

  setLockedStatus(data.value);
  window.location.reload();
};

const updateLockedStatusCall = (prevLockedStatus: boolean) => {
  const newData = {
    lockStatus: 'locked',
    value: !prevLockedStatus,
  };

  try {
    axios({
      method: 'PUT',
      url: `${import.meta.env.VITE_API_ADDRESS}LockedStatus`,
      headers: {
        'content-type': 'application/json',
      },
      data: newData,
    })
      .then((response) => updateLockedStatus(response, newData))
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setLockedStatus = (response: any) => {
  localStorage.setItem('lockedStatus', response);
};

const AdminPanel: FC = () => {
  const navigate = useNavigate();
  const { lockedStatus } = useContext(LockedStatusContext);
  const { userName } = useContext(UserContext);
  const [useColourMode, setUseColourMode] = useState<boolean>(false);
  const [useColourModeWholeRow, setUseColourModeWholeRow] = useState<boolean>(false);
  const [strikethrough, setStrikethrough] = useState<boolean>(false);
  const [stateOrderList, setStateOrderList] = useState<Order[] | null>(null);
  const userLoggedIn = userName !== undefined;

  useEffect(() => {
    fetchLockedStatus();
    fetchOrderList(setStateOrderList);
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

  if (
    userLoggedIn &&
    (userName === 'GirraffeKOOOO' ||
      userName === 'bloodtobleed' ||
      userName === 'MikeTheGreek' ||
      userName === 'Neomancer')
  )
    return (
      <Grid
        container
        sx={{
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
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
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
                </Grid>
                <Grid item>
                  <Typography>Order status: {lockedStatus ? 'locked' : 'unlocked'}</Typography>
                  <Button variant="contained" onClick={() => updateLockedStatusCall(lockedStatus)}>
                    {lockedStatus ? (
                      <>
                        <LockOpenOutlinedIcon fontSize="small" />
                        <Typography
                          fontSize={14}
                          sx={{ marginTop: '0.2rem', marginLeft: '0.2rem' }}
                        >
                          Unlock Orders
                        </Typography>
                      </>
                    ) : (
                      <>
                        <LockOutlinedIcon fontSize="small" />
                        <Typography
                          fontSize={14}
                          sx={{ marginTop: '0.2rem', marginLeft: '0.2rem' }}
                        >
                          Lock Orders
                        </Typography>
                      </>
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Stack>

            {stateOrderList && stateOrderList.length > 0 ? (
              <TableContent
                useColourMode={useColourMode}
                useColourModeWholeRow={useColourModeWholeRow}
                strikethrough={strikethrough}
                stateOrderList={stateOrderList}
                setStateOrderList={setStateOrderList}
              />
            ) : (
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
        <Grid item xs={2} />
      </Grid>
    );
};

export default AdminPanel;
