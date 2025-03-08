// libraries
import { FC, useState, MouseEvent, useMemo } from 'react';
import { Checkbox, Table, TableBody, TableCell, TableContainer } from '@mui/material';
// files
import TableHeader from './TableHeader';
// import MockLanOrderList from '../../MockLanOrderList';
import ascDescEnum from './ascDescEnum';
import { StyledTableRow } from './AdminPanelContent';
import StyledTableCell from './StyledTableCell';
import StyledTypeTableCell from './StyledTypeTableCell';
import colourSwitch from './ColourSwitch';
import { basicOrderType } from '../../Context/Types';
import COLOURS from '../../Theme/Colours';

// const updateOrderCall = (userName: string, orderType: string, completed: boolean) => {
//   const newData = {
//     userName: userName,
//     orderType: orderType,
//     completed: completed,
//   };
//   try {
//     axios({
//       method: 'PUT',
//       url: `${import.meta.env.VITE_API_ADDRESS}Order`,
//       headers: {
//         'content-type': 'application/json',
//       },
//       data: newData,
//     }).catch((error) => console.log(error));
//   } catch (error) {
//     console.log(error);
//   }
// };

type TableContentProps = {
  orderList: basicOrderType[];
  useColourMode: boolean;
  useColourModeWholeRow: boolean;
  strikethrough: boolean;
};

const TableContent: FC<TableContentProps> = ({
  orderList,
  useColourMode,
  useColourModeWholeRow,
  strikethrough,
}) => {
  const [orderDirection, setOrderDirection] = useState<ascDescEnum>(ascDescEnum.asc);
  const [valueToOrderBy, setValueToOrderBy] = useState<keyof basicOrderType>('userName');

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any
  function getComparator<Key extends keyof any>(
    order: ascDescEnum,
    orderBy: Key,
  ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === ascDescEnum.desc
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort<T>(array: basicOrderType[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleRequestSort = (_event: MouseEvent<unknown>, property: keyof basicOrderType) => {
    const isAsc = valueToOrderBy === property && orderDirection === ascDescEnum.asc;
    setOrderDirection(isAsc ? ascDescEnum.desc : ascDescEnum.asc);
    setValueToOrderBy(property);
  };

  const visibleRows = useMemo(
    () => stableSort(orderList, getComparator(orderDirection, valueToOrderBy)),
    [getComparator, orderDirection, orderList, valueToOrderBy],
  );

  // const checkboxChangeHandler = useCallback(
  //   (index: number, order: basicOrderType) => {
  //     if (!stateOrderList && !order.completed) return;

  //     const completedFlip = !order.completed;
  //     updateOrderCall(order.userName, order.orderType, completedFlip);

  //     const updatedArray = [...stateOrderList];
  //     updatedArray[index].completed = !updatedArray[index].completed;
  //     setStateOrderList(updatedArray);
  //   },
  //   [setStateOrderList, stateOrderList],
  // );

  return (
    <TableContainer>
      <Table sx={{ marginTop: '1rem' }} stickyHeader>
        <TableHeader
          orderDirection={orderDirection}
          valueToOrderBy={valueToOrderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {visibleRows.map((order, index) => {
            return (
              <StyledTableRow key={order.userName}>
                <StyledTableCell
                  orderType={order.orderType}
                  cellText={order.userName}
                  useColourModeWholeRow={useColourModeWholeRow}
                  strikethrough={strikethrough}
                  completed={order.completed}
                />
                <StyledTypeTableCell
                  useColourMode={useColourMode}
                  orderType={order.orderType}
                  strikethrough={strikethrough}
                  completed={order.completed}
                />
                <TableCell
                  align="right"
                  sx={{
                    backgroundColor: useColourModeWholeRow
                      ? colourSwitch(order.orderType)
                      : COLOURS.DARK_TABLE_CELL_BACKGROUND,
                  }}
                >
                  <Checkbox
                    // @ts-expect-error-wrong-type
                    checked={order.completed}
                    // @ts-expect-error-wrong-type
                    onChange={() => checkboxChangeHandler(index, order)}
                    sx={{
                      color: 'white',
                      '&.Mui-checked': {
                        color: 'white',
                      },
                    }}
                  />
                </TableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableContent;
