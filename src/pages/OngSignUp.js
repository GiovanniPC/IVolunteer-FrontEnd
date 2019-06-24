import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';
import FormButton from './modules/form/FormButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import If from '../utils/if';
import compose from '../utils/compose';
import { areasformat, states } from '../utils/variables';



const styles = theme => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
  fields:{
    backgroundColor: '#fff',
}
});

class OngSignUp extends React.Component {
  state = {
    name:'',
    username:'',
    password:'',
    cnpj:'',
    email:'',
    data_abertura: new Date(),
    city:'',
    state:'',
    responsavel:'',
    address:'',
    phone:'',
    error:'',
    area_atuacao:'',
    descricao:'',
    disabled:false,
    };

    handleChange = name => event => {
      this.setState({ [name]: event.target.value });
    };

    handleSignUp = async e => {
      e.preventDefault();
     const { username, password, name, cnpj, data_abertura, responsavel,
            area_atuacao, email, city, address,phone } = this.state;
      if( !username || !password || !name || !cnpj|| !data_abertura || !responsavel ||
        !area_atuacao||  !email || !city || !address || !phone ) {
        this.setState({ error: "Preencha todos os campos!" })
      }     
     else{
       this.setState({ disabled: true })
       const data = this.state
       try{
        const res = await api.post(`/signup/ong`, {data});
        console.log(res)
        if(res.status === 201 || res.status === 200){
          this.props.goToSign()
        }
        if(res.status === 202){
          this.setState({error: res.data.error, disabled: false})
        }
       }catch (res) {
         console.log(res)
         this.setState({
           error: "Houve um error com o cadastro, favor verifique suas credenciais.",
           disabled: false
         })
       }
     }
   }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.form}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                disabled={this.state.disabled}
                required
                fullWidth
                id="name"
                label="Nome Completo"
                className={classes.fields}
                value={this.state.name }
                onChange={this.handleChange('name')}
                margin="normal"
                variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                required
                disabled={this.state.disabled}
                fullWidth
                id="username"
                label="Nome de usuário"
                className={classes.fields}
                value={ this.state.username }
                onChange={this.handleChange('username')}
                margin="normal"
                variant="outlined"
            />
            </Grid>
        </Grid>
        <TextField
            required
            disabled={this.state.disabled}
            fullWidth
            id="email"
            label="E-mail"
            className={classes.fields}
            value={ this.state.email }
            onChange={this.handleChange('email')}
            margin="normal"
            variant="outlined"
        />
        <If teste={!this.props.userData}>
        <TextField
            required
            disabled={this.state.disabled}
            fullWidth
            id="password"
            label="Senha"
            type="password"
            className={classes.fields}
            value={this.state.password}
            onChange={this.handleChange('password')}
            margin="normal"
            variant="outlined"
        />
        </If>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
            required
            disabled={this.state.disabled}
            fullWidth
            id="name"
            label="CNPJ"
            className={classes.fields}
            value={ this.state.cnpj }
            onChange={this.handleChange('cnpj')}
            margin="normal"
            variant="outlined"
            />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            disabled={this.state.disabled}
            fullWidth
            id="username"
            label="Nome do responsável"
            className={classes.fields}
            value={ this.state.responsavel }
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
            disabled={this.state.disabled}
            fullWidth
            id="birth"
            label="Data de abertura"
            type="date"
            className={classes.fields}
            value={ this.state.data_abertura }
            onChange={this.handleChange('data_abertura')}
            margin="normal"
            variant="outlined"
        />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            select
            disabled={this.state.disabled}
            fullWidth
            id="state"
            variant="outlined"
            label="Área de atuação"
            margin="normal"
            className={classes.fields}
            value={ this.state.area_atuacao }
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
            disabled={this.state.disabled}
            fullWidth
            id="address"
            label="Endereço"
            className={classes.fields}
            value={ this.state.address }
            onChange={this.handleChange('address')}
            margin="normal"
            variant="outlined"
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
          <TextField
            required
            disabled={this.state.disabled}
            fullWidth
            id="city"
            label="Cidade"
            className={classes.fields}
            value={ this.state.city }
            onChange={this.handleChange('city')}
            margin="normal"
            variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            select
            disabled={this.state.disabled}
            fullWidth
            id="state"
            variant="outlined"
            label="Estado"
            margin="normal"
            className={classes.fields}
            value={ this.state.state }
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
            disabled={this.state.disabled}
            fullWidth
            id="phone"
            label="Telefone"
            className={classes.fields}
            value={ this.state.phone }
            onChange={this.handleChange('phone')}
            margin="normal"
            variant="outlined"
        />
        <TextField
        required
        disabled={this.state.disabled}
        id="outlined-dense-multiline"
        label="Descrição"
        fullWidth
        value={ this.state.descricao }
        className={classes.fields}
        onChange={this.handleChange('descricao')}
        margin="dense"
        variant="outlined"
        multiline
        rowsMax="10"
      />
      <Typography variant="h5" align="center" style={{color: '#ec407a'}}>
          {this.state.error}
      </Typography>
      <FormButton
        disabled={this.state.disabled}
        className={classes.button}
        color="secondary"
        fullWidth
        onClick={this.handleSignUp}
      >
        {'Cadastrar'}
      </FormButton>
      </div>
    )}
}

OngSignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withRoot,
  withStyles(styles),
)(OngSignUp);
