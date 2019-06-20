import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import AppBar from '../components/AppBar';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';
import If from '../../../utils/if';
import { isAuthenticated } from '../../../services/auth';

const styles = theme => ({
  title: {
    fontSize: 24,
    textDecoration: 'none',
    color: theme.palette.common.white
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    textDecoration: 'none',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
    textDecoration: 'none',
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
  link:{
    textDecoration: 'none'
  },
});

function AppAppBar(props) {
  const { classes } = props;

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Link
            to="/"
            className={classes.link}
          >
          <Typography
            variant="h6"
            color="inherit"
            className={classes.title}
            >
            {'eventos voluntarios'}
          </Typography>
          </Link>
          <If teste={!isAuthenticated()}>
            <div className={classes.right}>
              <Link
                to="/sign-in/"
                className={classes.link}
              >
              <Typography
                color="inherit"
                variant="h6"
                className={classes.rightLink}
              >
                {'Entrar'}
              </Typography>
              </Link>
              <Link
                to="/sign-up/"
                className={classes.link}
              >
              <Typography
                variant="h6"
                className={clsx(classes.rightLink, classes.linkSecondary)}
              >
                {'Cadastrar'}
                </Typography>
              </Link>
            </div>
          </If>
          <If teste={isAuthenticated()}>
            <div className={classes.right}>
              <Link
                to="/logout/"
                className={classes.link}
              >
              <Typography 
                color="inherit"
                variant="h6"
                underline="none"
                className={classes.rightLink}
              >
                {'Sair'}
              </Typography>
              </Link>
              <Link
                to="/profile/"
                className={classes.link}
              >
              <Typography
                color="inherit"
                variant="h6"
                underline="none"
                className={clsx(classes.rightLink, classes.linkSecondary)}>
                {'Perfil'}
              </Typography>
              </Link>
            </div>
          </If>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);
