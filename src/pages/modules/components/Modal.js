import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import FormButton from '../../modules/form/FormButton';
import AppForm from '../views/AppForm';
import If from '../../../utils/if';
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
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  button:{
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  }
});

class SimpleModal extends React.Component {

  render() {
    const { classes } = this.props;
    const { name, email, profession, phone, responsavel, address, area_atuacao } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.handleClose}
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
              Responsavel
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
              Áreas de interesse
            </Typography>
              {this.props.areas_conta}
            </If>
            <FormButton
            className={classes.button}
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
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;