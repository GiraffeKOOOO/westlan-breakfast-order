// libraries
import { useState, MouseEvent, useContext, FC } from 'react';
import {
  AppBar,
  Container,
  Grid,
  Menu,
  Stack,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
// providers
import UserContext from '../../Context/UserContext';
// files
import COLOURS from '../../Theme/Colours';
import logoWhite from '../../assets/logo-white.webp';
import NavButton from './NavButton';
import DarkModeButton from './DarkModeButton';
import MenuButton from './MenuButton';
import BackgroundBanner from '../BackgroundBanner/BackgroundBanner';
import NavbarMenuItem from './MenuItem';
// import logoDark from '../assets/logo-colour.webp';
// styles

const Navbar: FC = () => {
  const { userRole, userId, userName } = useContext(UserContext);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const userLoggedIn = userId !== undefined && userName !== undefined && userRole !== undefined;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (isMobile) {
    return (
      <AppBar
        position="static"
        sx={{
          backgroundColor: COLOURS.DARK_PRIMARY,
          color: COLOURS.DARK_FONT_PRIMARY,
        }}
      >
        <Container sx={{ borderBottom: `1px solid ${COLOURS.NAVBAR_BORDER_BOTTOM}` }}>
          <Grid container alignItems="center" justifyContent="center" sx={{ minHeight: '4rem' }}>
            <Grid item xs={1}>
              <p>1</p>
            </Grid>
            <Grid item xs={10} display="flex">
              <img
                src={logoWhite}
                style={{
                  height: '1.097rem',
                  width: '8rem',
                  cursor: 'pointer',
                  margin: 'auto',
                }}
                onClick={() => (window.location.href = 'https://westlan.co.uk/')}
              />
            </Grid>

            <Grid item xs={1}>
              <DarkModeButton />
            </Grid>
          </Grid>
        </Container>
        <BackgroundBanner />
      </AppBar>
    );
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: COLOURS.DARK_PRIMARY,
        color: COLOURS.DARK_FONT_PRIMARY,
      }}
    >
      <Container sx={{ borderBottom: `1px solid ${COLOURS.NAVBAR_BORDER_BOTTOM}` }}>
        <Grid container alignItems="center">
          <Grid item xs={10}>
            <Toolbar disableGutters={true}>
              <img
                src={logoWhite}
                style={{
                  height: '1.097em',
                  width: '8rem',
                  marginRight: '2rem',
                  cursor: 'pointer',
                }}
                onClick={() => (window.location.href = 'https://westlan.co.uk/')}
              />
              <Stack direction="row" justifyContent="space-between">
                <NavButton buttonName="Events" />
                <NavButton buttonName="Photos" />
                <NavButton buttonName="FAQs" />
                <NavButton buttonName="Support" />
              </Stack>
            </Toolbar>
          </Grid>

          <Grid item xs={2}>
            <DarkModeButton />
            <MenuButton handleOpenUserMenu={handleOpenUserMenu} />
            <Menu
              sx={{
                mt: '3rem',
                maxWidth: '1900px',
                minWidth: '1900px',
                '& .MuiMenu-paper': {
                  maxWidth: '1900px',
                  backgroundColor: COLOURS.DARK_MENU_BACKGROUND,
                },
              }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <NavbarMenuItem setting="Event Tickets" />
              <NavbarMenuItem setting="Settings" />
              {userLoggedIn ? (
                <NavbarMenuItem setting="Sign out" />
              ) : (
                <NavbarMenuItem setting="Log in" />
              )}
            </Menu>
          </Grid>
        </Grid>
      </Container>
      <BackgroundBanner />
    </AppBar>
  );
};

export default Navbar;
