// libraries
import { FC, useEffect, useState, MouseEvent, useMemo, useCallback } from 'react';
import { Checkbox, Table, TableCell, TableContainer } from '@mui/material';
// providers
// files
import TableHeader from './TableHeader';
import MockLanOrderList from '../../MockLanOrderList';
import ascDescEnum from './ascDescEnum';
import { StyledTableRow } from './AdminPanel';
import StyledTableCell from './StyledTableCell';
import StyledTypeTableCell from './StyledTypeTableCell';
import COLOURS from '../../Theme/Colours';
import colourSwitch from './ColourSwitch';
// styles

export type Order = {
  orderId: number;
  userName: string;
  orderType: string;
  completed: boolean;
};

type TableContentProps = {
  useColourMode: boolean;
  useColourModeWholeRow: boolean;
  strikethrough: boolean;
};

const TableContent: FC<TableContentProps> = ({
  useColourMode,
  useColourModeWholeRow,
  strikethrough,
}) => {
  const [stateOrderList, setStateOrderList] = useState<Order[]>([]);
  const [orderDirection, setOrderDirection] = useState<ascDescEnum>(ascDescEnum.asc);
  const [valueToOrderBy, setValueToOrderBy] = useState<keyof Order>('orderType');

  useEffect(() => {
    setStateOrderList(MockLanOrderList);
  }, []);

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

  function stableSort<T>(array: Order[], comparator: (a: T, b: T) => number) {
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

  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof Order) => {
    const isAsc = valueToOrderBy === property && orderDirection === ascDescEnum.asc;
    setOrderDirection(isAsc ? ascDescEnum.desc : ascDescEnum.asc);
    setValueToOrderBy(property);
  };

  const visibleRows = useMemo(
    () => stableSort(stateOrderList, getComparator(orderDirection, valueToOrderBy)),
    [getComparator, orderDirection, stateOrderList, valueToOrderBy],
  );

  const checkboxChangeHandler = useCallback(
    (orderIdParam: number) => {
      if (!stateOrderList) return;

      const updatedArray = [...stateOrderList];
      updatedArray[orderIdParam].completed = !updatedArray[orderIdParam].completed;

      setStateOrderList(updatedArray);
    },
    [stateOrderList],
  );

  return (
    <TableContainer>
      <Table sx={{ marginTop: '1rem' }} stickyHeader>
        <TableHeader
          orderDirection={orderDirection}
          valueToOrderBy={valueToOrderBy}
          onRequestSort={handleRequestSort}
        />
        {visibleRows.map((order, index) => {
          return (
            <StyledTableRow key={order.orderId}>
              <StyledTableCell
                orderType={order.orderType}
                cellText={order.orderId}
                useColourModeWholeRow={useColourModeWholeRow}
                strikethrough={strikethrough}
                completed={order.completed}
              />
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
                  checked={order.completed}
                  onChange={() => checkboxChangeHandler(order.orderId)}
                />
              </TableCell>
            </StyledTableRow>
          );
        })}
      </Table>
    </TableContainer>
  );
};

export default TableContent;
