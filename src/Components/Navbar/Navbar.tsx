// libraries
import { useState, MouseEvent, FC } from 'react';
import {
  AppBar,
  Box,
  Container,
  Drawer,
  Grid,
  IconButton,
  List,
  Menu,
  Stack,
  Toolbar,
  useMediaQuery,
  useTheme as muiTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
// files
import COLOURS from '../../Theme/Colours';
import logoWhite from '../../assets/logo-white.webp';
import logoDark from '../../assets/logo-colour.webp';
import NavButton from './NavButton';
import DarkModeButton from './DarkModeButton';
import MenuButton from './MenuButton';
import BackgroundBanner from '../BackgroundBanner/BackgroundBanner';
import NavbarMenuItem from './MenuItem';

type NavbarProps = {
  darkMode: boolean;
  userName: string | undefined;
};

const Navbar: FC<NavbarProps> = ({ darkMode, userName }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = muiTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const userLoggedIn = userName !== undefined;
  const container = window !== undefined ? window.document.body : undefined;

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // TODO: could potentially try to move this in to a custom component
  const drawer = (toggleClose: () => void) => {
    return (
      <Box
        sx={{
          height: '100vh',
          backgroundColor: darkMode ? COLOURS.DARK_PRIMARY : COLOURS.LIGHT_PRIMARY,
          borderRight: `1px solid ${COLOURS.DARK_MENU_BACKGROUND}`,
        }}
      >
        <IconButton
          onClick={toggleClose}
          sx={{
            backgroundColor: COLOURS.TRANSPARENT,
            border: COLOURS.TRANSPARENT,
            borderRadius: '0.375rem',
            color: COLOURS.DARK_MENU_BACKGROUND,
            marginLeft: '0.5rem',
            marginTop: '0.5rem',
          }}
        >
          <CloseIcon />
        </IconButton>

        <List disablePadding>
          <NavButton darkMode={darkMode} isMobile buttonName="Events" />
          <NavButton darkMode={darkMode} isMobile buttonName="Photos" />
          <NavButton darkMode={darkMode} isMobile buttonName="FAQs" />
          <NavButton darkMode={darkMode} isMobile buttonName="Support" />
        </List>

        <AppBar
          position="fixed"
          color="primary"
          sx={{
            top: 'auto',
            bottom: 0,
            left: 0,
            backgroundColor: darkMode ? COLOURS.DARK_PRIMARY : COLOURS.LIGHT_PRIMARY,
            borderTop: `1px solid ${COLOURS.DARK_MENU_BACKGROUND}`,
            borderRight: `1px solid ${COLOURS.DARK_MENU_BACKGROUND}`,
            width: '320px',
          }}
        >
          <MenuButton
            darkMode={darkMode}
            handleOpenUserMenu={handleOpenUserMenu}
            isMobile
            isOpen={Boolean(anchorElUser)}
          />
          <Menu
            sx={{
              maxWidth: '1900px',
              minWidth: '1900px',
              '& .MuiMenu-paper': {
                width: '320px',
                marginLeft: '-1rem',
                backgroundColor: darkMode ? COLOURS.DARK_MENU_BACKGROUND : COLOURS.LIGHT_PRIMARY,
              },
            }}
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <NavbarMenuItem darkMode={darkMode} setting="Event Tickets" />
            <NavbarMenuItem darkMode={darkMode} setting="Settings" />
            {userLoggedIn && <NavbarMenuItem darkMode={darkMode} setting="Sign out" />}
          </Menu>
        </AppBar>
      </Box>
    );
  };

  if (isMobile) {
    return (
      <>
        <AppBar
          position="static"
          sx={{
            backgroundColor: darkMode ? COLOURS.DARK_PRIMARY : COLOURS.LIGHT_PRIMARY,
            color: darkMode ? COLOURS.DARK_FONT_PRIMARY : COLOURS.LIGHT_FONT_PRIMARY,
          }}
        >
          <Container>
            <Grid container alignContent="center" sx={{ minHeight: '4rem' }}>
              <Grid item xs={1} sx={{ ml: '-0.5rem' }}>
                <IconButton
                  onClick={handleDrawerToggle}
                  sx={{
                    backgroundColor: COLOURS.TRANSPARENT,
                    border: COLOURS.TRANSPARENT,
                    borderRadius: '0.375rem',
                    color: COLOURS.DARK_MENU_BACKGROUND,
                    '&:hover': {
                      backgroundColor: COLOURS.DARK_BUTTON_HOVER_BACKGROUND,
                      color: COLOURS.DARK_FONT_PRIMARY,
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item xs={9.5} display="flex">
                <img
                  src={darkMode ? logoWhite : logoDark}
                  style={{
                    height: '1.097rem',
                    cursor: 'pointer',
                    margin: 'auto',
                  }}
                  onClick={() => (window.location.href = 'https://westlan.co.uk/')}
                />
              </Grid>

              <Grid item xs={1} sx={{ ml: '-0.5rem' }}>
                <DarkModeButton />
              </Grid>
            </Grid>
          </Container>
          <BackgroundBanner />
        </AppBar>
        <Drawer
          container={container}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 320 },
          }}
        >
          {drawer(handleDrawerToggle)}
        </Drawer>
      </>
    );
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: darkMode ? COLOURS.DARK_PRIMARY : COLOURS.LIGHT_PRIMARY,
        color: COLOURS.DARK_FONT_PRIMARY,
      }}
    >
      <Container>
        <Grid container alignItems="center">
          <Grid item xs={10}>
            <Toolbar disableGutters={true}>
              <img
                src={darkMode ? logoWhite : logoDark}
                style={{
                  height: '1.097em',
                  width: '8rem',
                  marginRight: '2rem',
                  cursor: 'pointer',
                }}
                onClick={() => (window.location.href = 'https://westlan.co.uk/')}
              />
              <Stack direction="row" justifyContent="space-between">
                <NavButton darkMode={darkMode} isMobile={false} buttonName="Events" />
                <NavButton darkMode={darkMode} isMobile={false} buttonName="Photos" />
                <NavButton darkMode={darkMode} isMobile={false} buttonName="FAQs" />
                <NavButton darkMode={darkMode} isMobile={false} buttonName="Support" />
              </Stack>
            </Toolbar>
          </Grid>

          <Grid item xs={2}>
            <DarkModeButton />
            <MenuButton
              darkMode={darkMode}
              isOpen={false}
              isMobile={false}
              handleOpenUserMenu={handleOpenUserMenu}
            />
            <Menu
              sx={{
                mt: '3rem',
                maxWidth: '1900px',
                minWidth: '1900px',
                '& .MuiMenu-paper': {
                  maxWidth: '1900px',
                  width: '12rem',
                  backgroundColor: darkMode ? COLOURS.DARK_MENU_BACKGROUND : COLOURS.LIGHT_PRIMARY,
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
              <NavbarMenuItem darkMode={darkMode} setting="Event Tickets" />
              <NavbarMenuItem darkMode={darkMode} setting="Settings" />
              {userLoggedIn && <NavbarMenuItem darkMode={darkMode} setting="Sign out" />}
            </Menu>
          </Grid>
        </Grid>
      </Container>
      <BackgroundBanner />
    </AppBar>
  );
};

export default Navbar;
