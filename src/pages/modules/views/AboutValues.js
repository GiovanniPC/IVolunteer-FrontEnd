import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import Avatar from '@material-ui/core/Avatar';
import imgGui from '../../../static/images/gui.png';
import imgJapa from '../../../static/images/japa.jpg';
import imgGigio from '../../../static/images/gigio.jpg';

const imgAnonimo = 'https://i.ytimg.com/vi/aIo6dM3DNZA/hqdefault.jpg';

const styles = theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
  },
  avatar:{
    height: 90,
    width: 90
  }
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
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <Avatar src={imgGui} className={classes.avatar}/>
              <Typography variant="h6" className={classes.title}>
                Guilherme Dias Fonseca
              </Typography>
              <Typography variant="h5">
                {'Desenvolvedor full stack com Python. Com um básico conhecimento em Machine Learning e React.'}
                {' Amante de jogos e música eletrônica e sem paciência para filas e aguardar escada rolante subir ou descer toda.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
            <Avatar src={imgGigio} className={classes.avatar}/>
              <Typography variant="h6" className={classes.title}>
                Giovanni Paulo da Cunha
              </Typography>
              <Typography variant="h5">
                {'Desenvolvedor Backend com Python. Com conhecimento básicos em React e JavaScript. '}
                {'Hobbies são jogar videogame, passear com meu cachorro e ler livros. '}
                {'Atualmente me focando em fazer cursos para aprimorar meu conhecimento na área e me desenvolver mais'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
            <Avatar src={imgJapa} className={classes.avatar}/>
              <Typography variant="h6" className={classes.title}>
                Guilherme Hideki Yuki
              </Typography>
              <Typography variant="h5">
                {'Engenheiro de software, formado em Eventos e com uma ótima comunicação pessoal. '}
                {'Hobbies ficar com os amigos, jogar futebol e ler livros '}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);
