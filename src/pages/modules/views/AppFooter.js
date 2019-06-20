import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import compose from '../../../utils/compose';
import logoTwitter from '../../../static/themes/onepirate/appFooterTwitter.png';
import logoFacebook from '../../../static/themes/onepirate/appFooterFacebook.png';

const styles = theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
  },
  iconsWrapper: {
    height: 120,
  },
  icons: {
    display: 'flex',
  },
  icon: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.warning.main,
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  list: {
    margin: 0,
    listStyle: 'none',
    paddingLeft: 0,
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  language: {
    marginTop: theme.spacing(1),
    width: 150,
  },
});


function AppFooter(props) {
  const { classes } = props;

  return (
    <Typography component="footer" className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justify="flex-end"
              className={classes.iconsWrapper}
              spacing={2}
            >
              <Grid item className={classes.icons}>
                <a href="https://material-ui.com/" className={classes.icon}>
                  <img src={logoFacebook} alt="Facebook" />
                </a>
                <a href="https://twitter.com/MaterialUI" className={classes.icon}>
                  <img src={logoTwitter} alt="Twitter" />
                </a>
              </Grid>
              <Grid item>© 2019 IVolunteer</Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              Legal
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link href="/terms/">Termos</Link>
              </li>
              <li className={classes.listItem}>
                <Link href="/privacy/">Privacidade</Link>
              </li>
              <li className={classes.listItem}>
                <Link href="/about/">Sobre</Link>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}

AppFooter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  React.memo,
  withStyles(styles),
)(AppFooter);
