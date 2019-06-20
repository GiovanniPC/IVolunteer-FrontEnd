import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';
import clock from '../../../static/themes/onepirate/productHowItWorks3.svg';
import suitCase from '../../../static/themes/onepirate/productHowItWorks1.svg';
import graph from '../../../static/themes/onepirate/productHowItWorks2.svg';
import { isAuthenticated } from '../../../services/auth';
import If from '../../../utils/if';

const styles = theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.secondary.light,
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(14),
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 55,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
    opacity: 0.7,
  },
  button: {
    marginTop: theme.spacing(8),
  },
});

function ProductHowItWorks(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src="/static/themes/onepirate/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Typography variant="h4" marked="center" className={classes.title} component="h2">
          Como Funciona
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>1.</div>
                <img
                  src={suitCase}
                  alt="suitcase"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Consulte nossa listagem de cadastrados, separados por area de atuação
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>2.</div>
                <img
                  src={graph}
                  alt="graph"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Verifique qualquer perfil desejavel
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>3.</div>
                <img
                  src={clock}
                  alt="clock"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  {'Entre em contato e comece a contribuir. '}
                  {'Viva e espalhe essa eperiencia com muito mais!'}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        <If teste={!isAuthenticated()}>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          className={classes.button}
          component="a"
          href="/sign-up/"
        >
          Começar agora
        </Button>
        </If>
      </Container>
    </section>
  );
}

ProductHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHowItWorks);
