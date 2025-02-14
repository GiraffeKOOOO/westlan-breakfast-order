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
          // TODO: add avatar to user context & display in navbar
          // localStorage.setItem('userAvatar', data.avata);
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
