// libraries
import { FC } from 'react';
import { TableCell, tableCellClasses } from '@mui/material';
// providers
// files
import COLOURS from '../../Theme/Colours';
import colourSwitch from './ColourSwitch';

type StyledTableCellProps = {
  orderType: string | number;
  cellText: string | number;
  useColourModeWholeRow: boolean;
  strikethrough: boolean;
  completed: string | number;
};

const StyledTableCell: FC<StyledTableCellProps> = ({
  orderType,
  cellText,
  useColourModeWholeRow,
  strikethrough,
  completed,
}) => {
  return (
    <TableCell
      align="right"
      sx={{
        [`&.${tableCellClasses.root}`]: {
          fontSize: 14,
          color: useColourModeWholeRow ? COLOURS.BLACK : COLOURS.DARK_TABLE_FONT,
          backgroundColor: useColourModeWholeRow
            ? colourSwitch(orderType)
            : COLOURS.DARK_TABLE_CELL_BACKGROUND,
          textDecoration: strikethrough && completed ? 'line-through' : '',
          textDecorationThickness: '0.3rem',
        },
        maxWidth: '10rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {cellText}
    </TableCell>
  );
};

export default StyledTableCell;
