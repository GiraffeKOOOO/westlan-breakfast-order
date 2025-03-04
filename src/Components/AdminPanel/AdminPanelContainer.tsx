// libraries
import { FC } from 'react';
// files
import { PanelContainerProps } from '../../Context/Types';
import AdminPanelContent from './AdminPanelContent';

const AdminPanel: FC<PanelContainerProps> = ({
  darkMode,
  userName,
  userDiscordId,
  userLoggedIn,
  lockedStatus,
}) => {
  if (
    !userLoggedIn ||
    !userName ||
    (!userDiscordId &&
      !(
        userDiscordId === `${import.meta.env.VITE_STAFF_1_ID}` ||
        userDiscordId === `${import.meta.env.VITE_STAFF_2_ID}` ||
        userDiscordId === `${import.meta.env.VITE_STAFF_3_ID}` ||
        userDiscordId === `${import.meta.env.VITE_STAFF_4_ID}`
      ))
  )
    return;

  return (
    <AdminPanelContent
      darkMode={darkMode}
      userName={userName}
      userDiscordId={userDiscordId}
      lockedStatus={lockedStatus}
    />
  );
};

export default AdminPanel;
