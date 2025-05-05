// libraries
import { FC } from 'react';
// files
import { PanelContainerProps } from '../../Context/Types';
import AdminPanelContent from './AdminPanelContent';
import useAdminCheck from '../../Components/AdminPanel/useAdminCheck';

const AdminPanel: FC<PanelContainerProps> = ({
  darkMode,
  userName,
  userDiscordId,
  userLoggedIn,
  lockedStatus,
}) => {
  const adminCheck = useAdminCheck(userDiscordId);

  if (!userLoggedIn || !userName || !userDiscordId) return null;
  if (!adminCheck) return null;

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
