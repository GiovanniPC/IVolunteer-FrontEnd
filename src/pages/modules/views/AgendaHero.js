import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import { isAuthenticated } from '../../../services/auth';
import If from '../../../utils/if';

const backgroundImage =
'https://firebasestorage.googleapis.com/v0/b/teste-4d87f.appspot.com/o/areas.jpg?alt=media&token=cfd3cd47-67c3-4a35-949b-bb9a615f240e';

const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

function ProductHero(props) {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={backgroundImage} alt="" />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Agenda
      </Typography>
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        Sempre temos algum tempinho livre para ajudar alguém, é só querer que a gente acha.
      </Typography>
      <If teste={!isAuthenticated()}>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        href="/sign-up/"
      >
        Cadastrar
      </Button>
      </If>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Faça parte dessa familia
      </Typography>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
