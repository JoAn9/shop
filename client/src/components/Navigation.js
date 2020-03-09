import React, { useContext, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import logo from '../img/logo.png';
import { AuthContext } from '../App';
import { LOGOUT } from '../actions/types';

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  activeLink: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
    paddingBottom: theme.spacing(1),
  },
  link: {
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  logo: { padding: '1rem' },
  drawerPaper: {
    width: drawerWidth,
  },
  navMobile: {
    display: 'flex',
    flexDirection: 'column',
  },
  navLarge: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

function Navigation() {
  const { state, dispatch } = useContext(AuthContext);
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  const login = (
    <li className={classes.link}>
      <NavLink to="/auth/user" activeClassName={classes.activeLink}>
        Login
      </NavLink>
    </li>
  );

  const logout = (
    <li className={classes.link}>
      <a href="/logout" onClick={handleLogout}>
        Logout
      </a>
    </li>
  );

  const { userIsAuthenticated, adminIsAuthenticated } = state;

  const menuItems = [
    {
      id: 0,
      link: '/products',
      title: 'All products',
    },
    {
      id: 1,
      link: '/questionnaire',
      title: 'Questionnaire',
    },
    {
      id: 2,
      link: '/auth/admin',
      title: 'Admin',
    },
    {
      id: 3,
      link: '/users',
      title: 'Register',
    },
  ];
  const menu = (
    <Fragment>
      {menuItems.map(item => (
        <li key={item.id} className={classes.link}>
          <NavLink to={item.link} activeClassName={classes.activeLink}>
            {item.title}
          </NavLink>
        </li>
      ))}
      {adminIsAuthenticated || userIsAuthenticated ? logout : login}
    </Fragment>
  );

  return (
    <Fragment>
      <Hidden smUp>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <nav>
            <ul className={classes.navMobile}>{menu}</ul>
          </nav>
        </Drawer>
      </Hidden>
      <Hidden xsDown>
        <nav className={classes.navLarge}>
          <NavLink to="/" className={classes.logo}>
            <img src={logo} alt="" style={{ width: '60px' }} />
          </NavLink>
          <ul>{menu}</ul>
        </nav>
      </Hidden>
    </Fragment>
  );
}

export default Navigation;
