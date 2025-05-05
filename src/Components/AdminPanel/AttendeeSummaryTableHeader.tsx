// libraries
import { FC } from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import WarningIcon from '@mui/icons-material/Warning';
// files
import COLOURS from '../../Theme/Colours';

interface HeadCell {
  id: string;
  label: string;
  icon: JSX.Element;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'attendeeTotal',
    label: 'Attendee Total',
    icon: <GroupsIcon />,
  },
  {
    id: 'orderTotal',
    label: 'Orders Logged',
    icon: <LunchDiningIcon />,
  },
  {
    id: 'missingTotal',
    label: 'Orders Missing',
    icon: <WarningIcon />,
  },
];

const AttendeeSummaryTableHeader: FC = () => {
  return (
    <TableHead sx={{ backgroundColor: COLOURS.DARK_MODE_BUTTON_LIGHT }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align="center" sx={{ color: COLOURS.DARK_FONT_PRIMARY }}>
            {headCell.label}
            <span style={{ verticalAlign: 'middle', marginLeft: '0.5rem' }}>{headCell.icon}</span>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default AttendeeSummaryTableHeader;
