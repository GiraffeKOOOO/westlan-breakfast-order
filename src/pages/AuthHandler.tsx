import { useEffect } from 'react';

const AuthHandler = () => {
  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', '?'));
    const accessToken = params.get('access_token');

    if (accessToken) {
      fetch('https://discord.com/api/users/@me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem('userName', data.global_name);
          localStorage.setItem('userAvatar', data.avatar);
          localStorage.setItem('userDiscordId', data.id);
          window.location.href = '/';
        })
        .catch((error) => console.error('Error fetching Discord data', error));
    }
  }, []);

  return (
    <div>
      If you have encountered an error, please go back to the previous page, or ask a member of
      staff for help
    </div>
  );
};

export default AuthHandler;
