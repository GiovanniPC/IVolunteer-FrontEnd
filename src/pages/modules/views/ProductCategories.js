import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import { Link } from 'react-router-dom';
import saude from '../../../static/images/saude.png';
import cultura from '../../../static/images/cultura.jpg';
import assistencia from '../../../static/images/assistencia.jpg';
import pesquisa from '../../../static/images/pesquisa.jpg';
import habitacao from '../../../static/images/habitacao.jpg';
import direito from   '../../../static/images/direito.jpg';
import meioAmbiente from '../../../static/images/meioAmbiente.jpg';

const styles = theme => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  images: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '40vh',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

function ProductCategories(props) {
  const { classes } = props;

  const images = [
    {
      url:meioAmbiente,
      title: 'Meio Ambiente',
      width: '50%',
      name: 'meio-ambiente',
     },
    {
      url: assistencia,
      title: 'Assistência social',
      width: '50%',
      name: 'assistencia-social',
    },
    {
      url: cultura,
      title: 'Cultura',
      width: '38%',
      name:'cultura',
    },
    {
      url: saude,
      title: 'Saúde',
      width: '38%',
      name:'saude',
    },
    {
      url: habitacao,
      title: 'Habitação',
      width: '24%',
      name:'habitacao'
    },
    {
      url: direito,
      title: 'Desenvolvimento e defesa de direitos',
      width: '50%',
      name:'defesa-direito',
    },
    {
      url: pesquisa,
      title: 'Educação e Pesquisa',
      width: '50%',
      name: 'educacao-pesquisa',
    },
  ];

  return (
    <Container className={classes.root} component="section">
      <Typography variant="h4" marked="center" align="center" component="h2">
        Todas as areas de atuação
      </Typography>
      <div className={classes.images}>
        {images.map(image => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}
          >
            <Link to={{
              pathname:'list',
              state:{name: image.name}
              }}>
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
            </Link>
          </ButtonBase>
        ))}
      </div>
    </Container>
  );
}

ProductCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCategories);
