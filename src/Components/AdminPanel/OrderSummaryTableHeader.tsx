// libraries
import { FC } from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';
// files
import COLOURS from '../../Theme/Colours';
import BREAKFAST_OPTIONS from '../BreakfastOptions';

interface HeadCell {
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    label: BREAKFAST_OPTIONS.FAT_BASTARD,
  },
  {
    label: BREAKFAST_OPTIONS.SAUSAGE_AND_BACON,
  },
  {
    label: BREAKFAST_OPTIONS.SAUSAGE_AND_EGG,
  },
  {
    label: BREAKFAST_OPTIONS.EGG_AND_BACON,
  },
  {
    label: BREAKFAST_OPTIONS.ONLY_BACON,
  },
  {
    label: BREAKFAST_OPTIONS.ONLY_SAUSAGE,
  },
  {
    label: BREAKFAST_OPTIONS.ONLY_EGG,
  },
];

const OrderSummaryTableHeader: FC = () => {
  return (
    <TableHead sx={{ backgroundColor: COLOURS.DARK_MODE_BUTTON_LIGHT }}>
      <TableRow>
        {headCells.map((headCell, iterator) => (
          <TableCell key={iterator} align="center" sx={{ color: COLOURS.DARK_FONT_PRIMARY }}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default OrderSummaryTableHeader;
