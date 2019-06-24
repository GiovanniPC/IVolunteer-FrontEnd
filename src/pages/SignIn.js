import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { sendLogin } from '../services/action';
import { Field, Form, FormSpy } from 'react-final-form';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import { required } from './modules/form/validation';
import RFTextField from './modules/form/RFTextField';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import compose from '../utils/compose';

const styles = theme => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    '&:hover':{
      color:'#ffffff',
    }
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
});

class SignIn extends React.Component {
  state = {
    sent: false,
    tipo:'ong'
  };

  validate = values => {
    const errors = required(['username', 'password'], values, this.props);
    return errors;
  };

  handleSubmit = async values => {
    required(['username', 'password'], values, this.props);
    const { username, password } = values;
    try{
      const response = await api.post(`/login/${this.state.tipo}`, {username, password});
      this.props.sendLogin({'token':response.data, 'tipo':this.state.tipo});
      this.props.history.push('/')
    }catch (err) {
      this.setState({
        error: "Houve um error com o login, favor verifique suas credenciais."
      })
    }
  }

  handleChange = event =>{
    this.setState({ tipo: event.target.value })
  }

  render() {
    const { classes } = this.props;
    const { sent } = this.state;

    return (
      <React.Fragment>
        <AppAppBar />
        <AppForm>
          <React.Fragment>
            <Typography variant="h3" gutterBottom marked="center" align="center">
              Entrar
            </Typography>
            <Typography variant="body2" align="center">
              {'Não é membro ainda? '}
              <Link href="/sign-up/" align="center" underline="always">
                Cadastre-se aqui!
              </Link>
            </Typography>
          </React.Fragment>
          <div style={{textAlign: 'center'}}>
          <FormControl
          syle={{
            display:'flex',
            alignItems: 'center',
          }}>
            <Select
              value={this.state.tipo}
              onChange={this.handleChange}
              style={{marginTop:20,  backgroundColor: 'white'}}
              input={<OutlinedInput labelWidth={''} name="age" id="outlined-age-simple" />}
            >
              <MenuItem value={'ong'} key={'ong'}>ONG</MenuItem>
              <MenuItem value={'volunteer'} key={'vonlunteer'}>Voluntário</MenuItem>
            </Select>
            <FormHelperText>Selecione o tipo de perfil</FormHelperText>
          </FormControl>
          </div>
          <Form
            onSubmit={this.handleSubmit}
            subscription={{ submitting: true }}
            validate={this.validate}
          >
            {({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <Field
                  autoFocus
                  type="text"
                  component={RFTextField}
                  disabled={submitting || sent}
                  fullWidth
                  label="Nome de usuário"
                  margin="normal"
                  name="username"
                  required
                  size="large"
                />
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="password"
                  autoComplete="current-password"
                  label="Senha"
                  type="password"
                  margin="normal"
                />
                <FormSpy subscription={{ submitError: true }}>
                  {({ submitError }) =>
                    submitError ? (
                      <FormFeedback className={classes.feedback} error>
                        {submitError}
                      </FormFeedback>
                    ) : null
                  }
                </FormSpy>
                <FormButton
                  className={classes.button}
                  disabled={submitting || sent}
                  size="large"
                  color="secondary"
                  fullWidth
                >
                  {submitting || sent ? 'In progress…' : 'Entrar'}
                </FormButton>
              </form>
            )}
          </Form>
        </AppForm>
        <AppFooter />
      </React.Fragment>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ token: state.auth.auth })
const mapDispatchToProps = dispatch =>
       bindActionCreators({ sendLogin }, dispatch)
const enhance = compose(
  withRouter,
  withRoot,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)
export default enhance(SignIn);
