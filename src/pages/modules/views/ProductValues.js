import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../components/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import clock from '../../../static/themes/onepirate/productValues3.svg';
import suitCase from '../../../static/themes/onepirate/productValues1.svg';
import graph from '../../../static/themes/onepirate/productValues2.svg';

const styles = theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.secondary.light,
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(10),
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
  image: {
    height: 55,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(14),
  },
  button: {
    '&:hover':{
      backgroundColor:theme.palette.secondary.dark,
      color: '#ffff'
    },
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
  },
});

function ProductValues(props) {
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
          Agenda de eventos
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={suitCase}
                alt="suitcase"
              />
              <Typography variant="h6" className={classes.title}>
              Cadastre
              </Typography>
              <Typography variant="h5">
                {'Você que é ONG pode marcar em nossa agenda todos seus eventos'}
                {', com isso todos poderam ver e se programar para participar também.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={graph}
                alt="graph"
              />
              <Typography variant="h6" className={classes.title}>
                Veja
              </Typography>
              <Typography variant="h5">
                {'Acessando a agenda é possível ver todos os eventos que as ONGs estão programando '}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={clock}
                alt="clock"
              />
              <Typography variant="h6" className={classes.title}>
                Voluntariar-se
              </Typography>
              <Typography variant="h5">
                {'Você voluntário cadastrado além de ver os eventos, pode se voluntariar em qualquer um '}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        href="/Agenda/"
      >
        Agenda
      </Button>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);
