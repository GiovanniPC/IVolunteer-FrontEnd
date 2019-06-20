import withRoot from './modules/withRoot';
import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import compose from '../utils/compose';
import If from '../utils/if';
import OngSignUp from './OngSignUp';
import VolunteerSignUp from './VolunteerSignUp';

class SignUp extends React.Component {
  state = {
    tipo:''
  };

  handleChange = event =>{
    this.setState({ tipo: event.target.value })
  }

  render() {
    return (
      <React.Fragment>
        <AppAppBar />
        <AppForm>
        <If teste={!this.props.userData}>
          <React.Fragment>
            <Typography variant="h3" gutterBottom marked="center" align="center">
              Cadastar
            </Typography>
            <Typography variant="body2" align="center">
              <Link href="/sign-in/" underline="always">
                Já possui uma conta?
              </Link>
            </Typography>
          </React.Fragment>
          <FormControl
          syle={{
            display:'flex',
            alignItems: 'center',
          }}>
            <Select
              value={this.state.tipo}
              onChange={this.handleChange}
              style={{marginTop:20}}
            >
              <MenuItem value={''} key={''}>Selecione</MenuItem>
              <MenuItem value={'ong'} key={'ong'}>ONG</MenuItem>
              <MenuItem value={'volunteer'} key={'volunteer'}>Voluntário</MenuItem>
            </Select>
            <FormHelperText>Selecione o tipo de perfil</FormHelperText>
          </FormControl>
          </If>
          <If teste={this.props.userData}>
          <React.Fragment>
            <Typography variant="h3" gutterBottom marked="center" align="center">
            Editar Informações
            </Typography>
          </React.Fragment>
          </If>
          <If teste={this.state.tipo === "ong" }>
          <OngSignUp userData={this.props.userData} />
          </If>
          <If teste={this.state.tipo === "volunteer" }>
          <VolunteerSignUp userData={this.props.userData} />
          </If>
        </AppForm>
        <AppFooter />
      </React.Fragment>
    );
  }
}

export default compose(
  withRoot,
)(SignUp);
