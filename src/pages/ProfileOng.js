import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';
import { connect } from 'react-redux';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from './modules/components/Typography';
import AppForm from './modules/views/AppForm';
import FormButton from './modules/form/FormButton';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { areasformat, states } from '../utils/variables';
import If from '../utils/if';
import compose from '../utils/compose';
const styles = theme => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    '&:hover':{
      color: '#ffff',
    }
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(1),
  },
  fields:{
    backgroundColor: '#ffff',
  }
});

class ProfileOng extends React.Component {
  state = {
    edit:false,
    data:''
  };

  editUserData = ()=> {
    this.setState({ edit: true, data: this.props.data })
  }

  handleChange = name => event => {
    const newValue = this.state.data
    newValue[name] = event.target.value
    this.setState({ data: newValue });
  };

  handleUpdate = async e => {
    e.preventDefault();
   const { username, name, cnpj, data_abertura, responsavel,
          area_atuacao, email, city, address,phone } = this.state.data;
    if( !username || !name || !cnpj|| !data_abertura || !responsavel ||
      !area_atuacao||  !email || !city || !address || !phone ) {
      this.setState({ error: "Preencha todos os campos!" })
      console.log('error')
    }     
   else{
     const data = this.state.data
     console.log(data)
     try{
       await api.put(`/my-details`, {data});
      this.setState({ edit: false })
     }catch (err) {
       console.log(err)
       this.setState({
         error: "Houve um error com o cadastro, favor verifique suas credenciais."
       })
     }
   }
 }
  render() {
    const { classes } = this.props;

    return (
      <div>
      <If teste={!this.state.edit}>
        <AppForm>
          <React.Fragment>
            <Typography variant="h3" gutterBottom marked="center" align="center">
              Meu perfil
            </Typography>
          </React.Fragment>
            <Typography variant="h6" className={classes.title}>
              Nome Completo
            </Typography>
            <Typography variant="h5">
              {this.props.data.name}
            </Typography>
            <Typography variant="h6" className={classes.title}>
              Nome de usuario
            </Typography>
            <Typography variant="h5">
              {this.props.data.username}
            </Typography>
            <Typography variant="h6" className={classes.title}>
              E-mail
            </Typography>
            <Typography variant="h5">
              {this.props.data.email}
            </Typography>
            <Typography variant="h6" className={classes.title}>
              Nome do responsavel
            </Typography>
            <Typography variant="h5">
              {this.props.data.responsavel}
            </Typography>
                <Grid container spacing={2} className={classes.title}>
                  <Grid item xs={12} sm={6}>
                  <Typography variant="h6" className={classes.title}>
                    CNPJ
                  </Typography>
                  <Typography variant="h5">
                    {this.props.data.cnpj}
                  </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Typography variant="h6" className={classes.title}>
                    Data de abertura
                  </Typography>
                  <Typography variant="h5">
                    {moment(this.props.data.data_abertura).format('DD/MM/YYYY')}
                  </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                  <Typography variant="h6" className={classes.title}>
                    Area de atuação
                  </Typography>
                  <Typography variant="h5">
                    {areasformat[this.props.data.area_atuacao]}
                  </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Typography variant="h6" className={classes.title}>
                    Telefone
                  </Typography>
                  <Typography variant="h5">
                    {this.props.data.phone}
                  </Typography>
                  </Grid>
                </Grid>
                <Typography variant="h6" className={classes.title}>
                  Endereço
                </Typography>
                <Typography variant="h5">
                  {this.props.data.address}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                  <Typography variant="h6" className={classes.title}>
                    Cidade
                  </Typography>
                  <Typography variant="h5">
                    {this.props.data.city}
                  </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <Typography variant="h6" className={classes.title}>
                    Estado
                  </Typography>
                  <Typography variant="h5">
                    {this.props.data.state}
                  </Typography>
                  </Grid>
                </Grid>
                <Typography variant="h6" className={classes.title}>
                  Desrição
                </Typography>
                <Typography variant="h5">
                  {this.props.data.descricao}
                </Typography>
                <FormButton
                  className={classes.button}
                  color="secondary"
                  fullWidth
                  onClick={this.editUserData}
                >
                  {'Editar'}
                </FormButton>
        </AppForm>
        </If>
        <If teste={this.state.edit}>
                  <AppForm>
          <React.Fragment>
            <Typography variant="h3" gutterBottom marked="center" align="center">
              Editar meus dados
            </Typography>
          </React.Fragment>
          <form onSubmit={this.handleUpdate} className={classes.form}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                required
                fullWidth
                id="name"
                label="Nome Completo"
                className={classes.fields}
                value={this.state.data.name }
                onChange={this.handleChange('name')}
                margin="normal"
                variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                required
                fullWidth
                id="username"
                label="Nome de usuario"
                className={classes.fields}
                value={ this.state.data.username }
                onChange={this.handleChange('username')}
                margin="normal"
                variant="outlined"
            />
            </Grid>
        </Grid>
        <TextField
            required
            fullWidth
            id="email"
            label="E-mail"
            className={classes.fields}
            value={ this.state.data.email }
            onChange={this.handleChange('email')}
            margin="normal"
            variant="outlined"
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
            required
            fullWidth
            id="name"
            label="CNPJ"
            className={classes.fields}
            value={ this.state.data.cnpj }
            onChange={this.handleChange('cnpj')}
            margin="normal"
            variant="outlined"
            />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            fullWidth
            id="username"
            label="Nome do responsavel"
            className={classes.fields}
            value={ this.state.data.responsavel }
            onChange={this.handleChange('responsavel')}
            margin="normal"
            variant="outlined"
        />
        </Grid>
    </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="birth"
            label="Data de abertura"
            type="date"
            className={classes.fields}
            value={ this.state.data.data_abertura }
            onChange={this.handleChange('data_abertura')}
            margin="normal"
            variant="outlined"
        />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            id="state"
            variant="outlined"
            label="Área de atuação"
            margin="normal"
            className={classes.fields}
            value={ this.state.data.area_atuacao }
            onChange={this.handleChange('area_atuacao')}
            >
            {Object.keys(areasformat).map(option => (
            <MenuItem key={option} value={option}>
                {areasformat[option]}
            </MenuItem>
            ))}
        </TextField>
          </Grid>
        </Grid>
        <TextField
            required
            fullWidth
            id="address"
            label="Endereço"
            className={classes.fields}
            value={ this.state.data.address }
            onChange={this.handleChange('address')}
            margin="normal"
            variant="outlined"
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="city"
            label="Cidade"
            className={classes.fields}
            value={ this.state.data.city }
            onChange={this.handleChange('city')}
            margin="normal"
            variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            id="state"
            variant="outlined"
            label="Estado"
            margin="normal"
            className={classes.fields}
            value={ this.state.data.state }
            onChange={this.handleChange('state')}
            >
            {Object.keys(states).map(option => (
            <MenuItem key={option} value={states[option]}>
                {states[option]}
            </MenuItem>
            ))}
        </TextField>
          </Grid>
        </Grid>
        <TextField
            required
            fullWidth
            id="phone"
            label="Telefone"
            className={classes.fields}
            value={ this.state.data.phone }
            onChange={this.handleChange('phone')}
            margin="normal"
            variant="outlined"
        />
        <TextField
        required
        id="outlined-dense-multiline"
        label="Descrição"
        fullWidth
        value={ this.state.data.descricao }
        className={classes.fields}
        onChange={this.handleChange('descricao')}
        margin="dense"
        variant="outlined"
        multiline
        rowsMax="10"
      />
      <FormButton
        className={classes.button}
        color="secondary"
        fullWidth
      >
        {'Atualizar'}
      </FormButton>
      </form>
          </AppForm>
        </If>
        </div>
    );
  }
}

ProfileOng.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ data: state.auth.accountdata })
const enhance = compose(
  withRoot,
  withRouter,
  withStyles(styles),
  connect(mapStateToProps),
)
export default enhance(ProfileOng);
