// libraries
import { FC, MouseEvent } from 'react';
import { Box, TableBody, TableCell, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
// files
import ascDescEnum from './ascDescEnum';
import { basicOrderType } from '../../Context/Types';
import COLOURS from '../../Theme/Colours';

interface HeadCell {
  id: keyof basicOrderType;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'userName',
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
  onRequestSort: (event: MouseEvent<unknown>, property: keyof basicOrderType) => void;
};

const TableHeader: FC<TableHeaderProps> = ({ valueToOrderBy, orderDirection, onRequestSort }) => {
  const createSortHandler = (property: keyof basicOrderType) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableBody>
      <TableRow sx={{ backgroundColor: COLOURS.DARK_MODE_BUTTON_LIGHT }}>
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
              sx={{ color: COLOURS.DARK_BUTTON_PRIMARY }}
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
    </TableBody>
  );
};

export default TableHeader;
