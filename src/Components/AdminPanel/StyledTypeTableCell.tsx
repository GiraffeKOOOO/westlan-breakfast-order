// libraries
import { FC } from 'react';
import { TableCell, tableCellClasses } from '@mui/material';
// providers
// files
import COLOURS from '../../Theme/Colours';
import colourSwitch from './ColourSwitch';
// styles

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
