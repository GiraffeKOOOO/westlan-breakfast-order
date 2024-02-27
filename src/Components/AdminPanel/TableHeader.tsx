// libraries
import { FC, MouseEvent } from 'react';
import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
// providers
// files
import ascDescEnum from './ascDescEnum';
import { Order } from './TableContent';
// styles

interface HeadCell {
  id: keyof Order;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'orderId',
    label: 'Order Id',
  },
  {
    id: 'orderId',
    label: 'Username',
  },
  {
    id: 'orderType',
    label: 'Order Type',
  },
  {
    id: 'completed',
    label: 'Completed',
  },
];

type TableHeaderProps = {
  orderDirection: ascDescEnum;
  valueToOrderBy: string;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof Order) => void;
};

const TableHeader: FC<TableHeaderProps> = ({ valueToOrderBy, orderDirection, onRequestSort }) => {
  const createSortHandler = (property: keyof Order) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="right"
            sortDirection={valueToOrderBy === headCell.id ? orderDirection : false}
          >
            <TableSortLabel
              active={valueToOrderBy === headCell.id}
              direction={valueToOrderBy === headCell.id ? orderDirection : ascDescEnum.asc}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {valueToOrderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {orderDirection === ascDescEnum.desc ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
