// libraries
import { FC, useState, MouseEvent, useMemo, useCallback, Dispatch, SetStateAction } from 'react';
import { Checkbox, Table, TableBody, TableCell, TableContainer } from '@mui/material';
// files
import TableHeader from './TableHeader';
import ascDescEnum from './ascDescEnum';
import { StyledTableRow } from './AdminPanelContent';
import StyledTableCell from './StyledTableCell';
import StyledTypeTableCell from './StyledTypeTableCell';
import colourSwitch from './ColourSwitch';
import { basicOrderType } from '../../Context/Types';
import COLOURS from '../../Theme/Colours';

type TableContentProps = {
  orderList: basicOrderType[];
  setStateTableData: Dispatch<SetStateAction<basicOrderType[]>>;
  updateOrder: (orderData: {
    orderId: number;
    userName: string;
    orderType: string;
    completed: boolean;
  }) => void;
  forceInvalidate: () => void;
  useColourMode: boolean;
  useColourModeWholeRow: boolean;
  strikethrough: boolean;
};

const TableContent: FC<TableContentProps> = ({
  orderList,
  setStateTableData,
  updateOrder,
  forceInvalidate,
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

  const checkboxChangeHandler = useCallback(
    (index: number, order: basicOrderType) => {
      const completedFlip = !order.completed;

      updateOrder({
        orderId: 0,
        userName: order.userName,
        orderType: order.orderType,
        completed: completedFlip,
      });
      forceInvalidate();

      setStateTableData((prev) => {
        const updatedArray = [...prev];
        updatedArray[index].completed = completedFlip;
        return updatedArray;
      });
    },
    [forceInvalidate, setStateTableData, updateOrder],
  );

  const visibleRows = useMemo(
    () => stableSort(orderList, getComparator(orderDirection, valueToOrderBy)),
    [getComparator, orderDirection, orderList, valueToOrderBy],
  );

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
                      color: useColourModeWholeRow ? 'black' : 'white',
                      '&.Mui-checked': {
                        color: useColourModeWholeRow ? 'black' : 'white',
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
