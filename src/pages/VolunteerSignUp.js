import withRoot from './modules/withRoot';
import { withRouter } from 'react-router-dom';
// --- Post bootstrap -----
import React from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormButton from './modules/form/FormButton';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import compose from '../utils/compose';
import { jobs, states } from '../utils/variables';
import If from '../utils/if';

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

class VolunteerSignUp extends React.Component {
  state = {
    name: '',
    email:'',
    username:'',
    password:'',
    birth: new Date(),
    city:'',
    state:'',
    profession_id:'',
    address:'',
    phone:'',
    error:'',
    saude:false,
    meio_ambiente:false,
    assistencia_social:false,
    cultura:false,
    dev_defesa_direito:false,
    educacao_pesquisa:false,
    habitacao:false
  };

  handleSignUp = async e => {
    e.preventDefault();
   const { username, password, name, email, city, address,phone } = this.state;
    if( !username || !password || !name || !email || !city || !address || !phone ) {
      this.setState({ error: "Preencha todos os campos!" })
    }
    const { saude, meio_ambiente, assistencia_social, 
      cultura, dev_defesa_direito,educacao_pesquisa, habitacao } = this.state;
    if( !saude && !meio_ambiente && !assistencia_social && 
    !cultura && !dev_defesa_direito && !educacao_pesquisa && !habitacao ) {
      this.setState({ error: "Selecione pelo menos uma area!" })
    }
   else{
     const data = this.state
     try{
      const res = await api.post(`/signup/volunteer`, {data});
      if(res.status === 201 || res.status === 200){
        this.props.goToSign()
      }
      if(res.status === 202){
        this.setState({error: res.data.error})
      }
     }catch (err) {
       console.log(err)
       this.setState({
         error: "Houve um error com o cadastro, favor verifique suas credenciais."
       })
     }
   }
 }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChangeCheck = name => event => {
    this.setState({ [name]: event.target.checked })
}

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.form}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                required
                fullWidth
                id="name"
                label="Nome Completo"
                className={classes.fields}
                value={this.state.name}
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
                value={this.state.username}
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
            value={this.state.email}
            onChange={this.handleChange('email')}
            margin="normal"
            variant="outlined"
        />
        <If teste={!this.props.userData}>
        <TextField
            required
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
            fullWidth
            id="birth"
            label="Data de nascimento"
            type="date"
            className={classes.fields}
            value={this.state.birth}
            onChange={this.handleChange('birth')}
            margin="normal"
            variant="outlined"
        />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="phone"
            label="Telefone"
            className={classes.fields}
            value={this.state.phone}
            onChange={this.handleChange('phone')}
            margin="normal"
            variant="outlined"
        />
          </Grid>
        </Grid>
        <TextField
            select
            fullWidth
            id="profissao"
            variant="outlined"
            label="Profissão"
            margin="normal"
            className={classes.fields}
            value={this.state.profession_id}
            onChange={this.handleChange('profession_id')}
            >
            {Object.keys(jobs).map(option => (
            <MenuItem key={option} value={option}>
                {jobs[option]}
            </MenuItem>
            ))}
        </TextField>
        <TextField
            required
            fullWidth
            id="address"
            label="Endereço"
            className={classes.fields}
            value={this.state.address}
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
            value={this.state.city}
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
            value={this.state.state}
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
        <FormLabel component="legend">Áreas de interesse</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={this.state.meio_ambiente}
                onChange={this.handleChangeCheck('meio_ambiente')} />}
            label="Meio Ambiente"
          />
          <FormControlLabel
            control={<Checkbox checked={this.state.assistencia_social}
               onChange={this.handleChangeCheck('assistencia_social')} />}
            label="Assistência Social"
          />
          <FormControlLabel
            control={<Checkbox checked={this.state.saude}
               onChange={this.handleChangeCheck('saude')} />}
            label="Saude"
          />
          <FormControlLabel
            control={<Checkbox checked={this.state.habitacao}
               onChange={this.handleChangeCheck('habitacao')} />}
            label="Habitação"
          />
          <FormControlLabel
            control={<Checkbox checked={this.state.dev_defesa_direito}
              onChange={this.handleChangeCheck('dev_defesa_direito')} />}
            label="Desenvolvimento e Defesa dos direitos"
          />
          <FormControlLabel
            control={<Checkbox checked={this.state.educacao_pesquisa}
               onChange={this.handleChangeCheck('educacao_pesquisa')} />}
            label="Educação e pesquisa"
          />
          <FormControlLabel
            control={<Checkbox checked={this.state.cultura}
               onChange={this.handleChangeCheck('cultura')} />}
            label="Cultura"
          />
        </FormGroup>
        <Typography variant="h5" align="center" style={{color: '#ec407a'}}>
          {this.state.error}
      </Typography>
        <FormButton
          onClick={this.handleSignUp}
          className={classes.button}
          color="secondary"
          fullWidth
        >
          {'Cadastrar'}
        </FormButton>
      </div>
    )}
}

VolunteerSignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withRouter,
  withRoot,
  withStyles(styles),
)(VolunteerSignUp);
