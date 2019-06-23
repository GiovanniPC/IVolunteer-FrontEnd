import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import api from '../../../services/api';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import FormButton from '../../modules/form/FormButton';
import AppForm from '../views/AppForm';
import If from '../../../utils/if';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  button:{
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    '&:hover':{
      color:'#ffffff'
    }
  },
  buttonCancel: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    color:'#ffffff',
    backgroundColor: '#616161',
    '&:hover':{
      backgroundColor:'#000000',
    }
  },
});

class EnventModal extends React.Component {

  state={
    start:new Date(),
    end:new Date(),
    title:'',
    description:'',
  }

  handlePost = async () => {
    const data = {
      event_id: this.props.id,
      ong_id: this.props.ong_id
    }
    try{
      await api.post(`/orders`, {data});
      this.setState({
        error: "Solicitação realizada com sucesso."
      })
    }catch (err) {
      this.setState({
        error: "Você já se voluntáriou para esse evento."
      })
    }
  }
  render() {
    const { classes } = this.props;
    const { title, description, start, end, ong_name } = this.props;
    return (
      
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.handleClose}
        >
          <AppForm style={getModalStyle()} className={classes.paper}>
          <Typography variant="h6" className={classes.title} align="center">
              Responsavel
            </Typography>
            <Typography variant="h5" align="center">
                {ong_name}
            </Typography>
            <Typography variant="h6" className={classes.title} align="center">
              Título
            </Typography>
            <Typography variant="h5" align="center">
                {title}
            </Typography>
            <Typography variant="h6" className={classes.title} align="center">
              Descrição
            </Typography>
            <Typography variant="h5" align="center">
                {description}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <Typography variant="h6" className={classes.title} align="center">
                Data Inicio
              </Typography>
              <Typography variant="h5" align="center">
                  {moment(start).format('DD/MM/YYYY')}
              </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Typography variant="h6" className={classes.title} align="center">
                Data Fim
              </Typography>
              <Typography variant="h5" align="center">
                  {moment(end).format('DD/MM/YYYY')}
              </Typography>
              </Grid>
            </Grid>
            <Typography variant="h5" align="center" style={{color: '#ec407a'}}>
                  {this.state.error}
              </Typography>
            <If teste={this.props.tipo === 'volunteer'}>
              <FormButton
                className={classes.button}
                color="secondary"
                fullWidth
                onClick={this.handlePost}
                >
                {'Voluntariar-se'}
              </FormButton>
            </If>
            <FormButton
              className={classes.buttonCancel}
              color="secondary"
              fullWidth
              onClick={this.props.handleClose}
              >
              {'Fechar'}
            </FormButton>
            <SimpleModalWrapped />
          </AppForm>
        </Modal>
      </div>
    )};
    }
    EnventModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

const SimpleModalWrapped = withStyles(styles)(EnventModal);
const mapStateToProps = state => ({ tipo: state.auth.tipo })
export default connect(mapStateToProps)(SimpleModalWrapped);