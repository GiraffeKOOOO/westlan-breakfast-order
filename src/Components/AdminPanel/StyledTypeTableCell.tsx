// libraries
import { FC } from 'react';
import { TableCell, tableCellClasses } from '@mui/material';
// files
import colourSwitch from './ColourSwitch';
import COLOURS from '../../Theme/Colours';

type StyledTypeTableCellProps = {
  orderType: string | number;
  useColourMode: boolean;
  strikethrough: boolean;
  completed: string | number;
};

const StyledTypeTableCell: FC<StyledTypeTableCellProps> = ({
  orderType,
  useColourMode,
  strikethrough,
  completed,
}) => {
  return (
    <TableCell
      align="right"
      sx={{
        [`&.${tableCellClasses.root}`]: {
          fontSize: 14,
          color: useColourMode ? COLOURS.BLACK : COLOURS.DARK_TABLE_FONT,
          backgroundColor: useColourMode
            ? colourSwitch(orderType)
            : COLOURS.DARK_TABLE_CELL_BACKGROUND,
          textDecoration: strikethrough && completed ? 'line-through' : '',
          textDecorationThickness: '0.3rem',
        },
      }}
    >
      {orderType}
    </TableCell>
  );
};

export default StyledTypeTableCell;
