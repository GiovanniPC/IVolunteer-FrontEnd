import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { jobs } from '../../utils/variables';
import If from '../../utils/if';

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
});

class SimpleModal extends React.Component {

  render() {
    const { classes } = this.props;
    const { name, email, profession, phone, responsavel } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
            {name}
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
            E-mail: {email}
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
            Telefone: {phone}
            </Typography>
            <If teste={profession}>
            <Typography variant="subtitle1" id="simple-modal-description">
            Profissão: {jobs[profession]}
            </Typography>
            </If>
            <If teste={!profession}>
            <Typography variant="subtitle1" id="simple-modal-description">
            Responsavel: {responsavel}
            </Typography>
            </If>
            <Button onClick={this.props.handleClose}>Fechar</Button>
            <SimpleModalWrapped />
          </div>
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