const CLIENT_ID = `${import.meta.env.VITE_CLIENT_ID}`;
const REDIRECT_URI = `${import.meta.env.VITE_REDIRECT_ADDRESS}`;
const OAUTH_URL = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
  REDIRECT_URI,
)}&response_type=token&scope=identify`;

const DiscordLogin = () => {
  const handleLogin = () => {
    window.location.href = OAUTH_URL;
  };

  return <button onClick={handleLogin}>Login with Discord</button>;
};

export default DiscordLogin;
