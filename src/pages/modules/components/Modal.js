import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import api from '../../../services/api';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import FormButton from '../../modules/form/FormButton';
import AppForm from '../views/AppForm';
import If from '../../../utils/if';
import moment from 'moment';
import { jobs, areasformat } from '../../../utils/variables';

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
  error:{
    color: theme.palette.error.main
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
  buttonProfile: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    color:'#ffffff',
    backgroundColor: '#616161',
    '&:hover':{
      backgroundColor:'#000000',
    }
  },
  fields:{
    backgroundColor: '#fff',
}
});

class SimpleModal extends React.Component {

  state={
    start:new Date(),
    end:new Date(),
    title:'',
    description:'',
    disabled:false,
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  createEvent = async () => {
    const { start, end, description, title } = this.state;
  if( !start || !end || !description|| !title ) {
    this.setState({ error: "Preencha todos os campos!" })
    }
    else{
      this.setState({ disabled: true })
      const data = this.state
      try{
        await api.post(`/events`, {data});
        this.props.loadEvents();
        this.props.handleClose();
        this.setState({ disabled: false })
      }catch (err) {
        console.log(err)
        this.setState({
          error: "Já existe um evento com este nome.",
          disabled: false
        })
      }
    }
  }
  render() {
    const { classes } = this.props;
    const { name, email, profession, phone, responsavel, address, descricao, area_atuacao } = this.props;
    return (
      
      <div>
        <If teste={this.props.modal === 'profile'}>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.handleClose}
          style={{
            overflowY:'auto',
            maxHeight:'100vh'
          }}
        >
          <AppForm style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" className={classes.title}>
              Nome
            </Typography>
            <Typography variant="h5">
                {name}
            </Typography>
            <Typography variant="h6" className={classes.title}>
              E-mail
            </Typography>
            <Typography variant="h5">
                {email}
            </Typography>
            <Typography variant="h6" className={classes.title}>
              Telefone
            </Typography>
            <Typography variant="h5">
                {phone}
            </Typography>
            <If teste={profession}>
            <Typography variant="h6" className={classes.title}>
              Profissão
            </Typography>
            <Typography variant="h5">
                {jobs[profession]}
            </Typography>
            </If>
            <If teste={!profession}>
            <Typography variant="h6" className={classes.title}>
              Responsável
            </Typography>
            <Typography variant="h5">
                {responsavel}
            </Typography>
            <Typography variant="h6" className={classes.title}>
              Área de atuação
            </Typography>
            <Typography variant="h5">
                {areasformat[area_atuacao]}
            </Typography>
            </If>
            <Typography variant="h6" className={classes.title}>
              Endereço
            </Typography>
            <Typography variant="h5">
                {address}
            </Typography>
            <If teste={this.props.area_atuacao}>
            <Typography variant="h6" className={classes.title}>
              Descrição
            </Typography>
            <Typography variant="body1">
                {descricao}
            </Typography>
            </If>
            <If teste={!this.props.area_atuacao}>
            <Typography variant="h6" className={classes.title}>
              Áreas de interesse
            </Typography>
              {this.props.areas_conta}
            </If>
            <FormButton
            className={classes.buttonProfile}
            color="secondary"
            fullWidth
            onClick={this.props.handleClose}
            >
            {'Fechar'}
          </FormButton>
            <SimpleModalWrapped />
          </AppForm>
        </Modal>
        </If>
        <If teste={this.props.modal === 'events'}>
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.props.open}
            onClose={this.props.handleClose}
            style={{
              overflowY:'auto',
              maxHeight:'100vh'
            }}
          >
          <AppForm style={getModalStyle()} className={classes.paper}>
            <Typography variant="h4" gutterBottom marked="center" align="center">
                Criar evento
              </Typography>
              <Typography variant="h5" gutterBottom marked="center" className={classes.error} align="center">
              {this.state.error}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  disabled={this.state.disabled}
                  fullWidth
                  id="start"
                  label="Data de início"
                  type="datetime-local"
                  className={classes.fields}
                  value={this.state.start}
                  onChange={this.handleChange('start')}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  disabled={this.state.disabled}
                  fullWidth
                  id="end"
                  label="Data de fim"
                  type="datetime-local"
                  className={classes.fields}
                  value={this.state.end}
                  onChange={this.handleChange('end')}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            </Grid>
              <TextField
                required
                disabled={this.state.disabled}
                fullWidth
                id="title"
                label="Titulo"
                className={classes.fields}
                value={this.state.title}
                onChange={this.handleChange('title')}
                margin="normal"
                variant="outlined"
              />
              <TextField
                required
                disabled={this.state.disabled}
                id="outlined-dense-multiline"
                label="Descrição"
                fullWidth
                value={ this.state.description }
                className={classes.fields}
                onChange={this.handleChange('description')}
                margin="dense"
                variant="outlined"
                multiline
                rowsMax="10"
              />
              <FormButton
              disabled={this.state.disabled}
              className={classes.button}
              color="secondary"
              fullWidth
              onClick={this.createEvent}
              >
              {'Criar'}
            </FormButton>
            <FormButton
              className={classes.buttonCancel}
              color="secondary"
              fullWidth
              onClick={this.props.handleClose}
              >
              {'Cancelar'}
            </FormButton>
              <SimpleModalWrapped />
          </AppForm>
        </Modal>
        </If>
      </div>
    )};
    }
SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;