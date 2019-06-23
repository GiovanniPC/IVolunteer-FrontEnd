import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';
import { connect } from 'react-redux';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from './modules/components/Typography';
import AppForm from './modules/views/AppForm';
import FormButton from './modules/form/FormButton';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import { jobs, areasformat, states } from '../utils/variables';
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
  buttonCancel: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    color:'#ffffff',
    backgroundColor: '#616161',
    '&:hover':{
      backgroundColor:'#000000',
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
    backgroundColor: '#fff',
}
});

class ProfileVolunteer extends React.Component {
  state = {
    edit:false,
    data:'',
    areas:''
  };

  handleChange = name => event => {
    const newValue = this.state.data
    newValue[name] = event.target.value
    this.setState({ data: newValue });
  };

  handleChangeCheck = name => event => {
    const newValue = this.state.areas
    newValue[name] = event.target.checked
    this.setState({ areas: newValue });
  };
  editUserData = () => {
    this.setState({edit: true, data: this.props.data, areas: this.props.areas})
  }

  handleCancel = () => {
    this.setState({edit: false})
  }

  handleUpdate = async e => {
    e.preventDefault();
     const data = this.state.areas
     data['volunteer'] = this.state.data
     try{
      await api.put(`/my-details`, {data});
      this.setState({ edit: false })
     }catch (err) {
       console.log(err)
       this.setState({
         error: "Houve um error com a atualização, favor verifique suas credenciais."
       })
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
                <Grid container spacing={2} className={classes.title}>
                  <Grid item xs={12} sm={6}>
                  <Typography variant="h6" className={classes.title}>
                    Data de nascimento
                  </Typography>
                  <Typography variant="h5">
                    {moment(this.props.data.birth).format('DD/MM/YYYY')}
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
                  Profissão
                </Typography>
                <Typography variant="h5">
                  {jobs[this.props.data.profession_id]}
                </Typography>
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
                  Áreas de interesse
                </Typography>
                {Object.keys(this.props.areas).map((res) => (
                      <If teste={this.props.areas[res]}>
                        <Typography variant="h5">{areasformat[res]}</Typography>
                      </If>
                    ))}
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
              Editar meu dados
            </Typography>
            <form onSubmit={this.handleUpdate} className={classes.form}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                required
                fullWidth
                id="name"
                label="Nome Completo"
                className={classes.fields}
                value={this.state.data.name}
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
                value={this.state.data.username}
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
            value={this.state.data.email}
            onChange={this.handleChange('email')}
            margin="normal"
            variant="outlined"
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="birth"
            label="Data de nascimento"
            type="date"
            className={classes.fields}
            value={this.state.data.birth}
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
            value={this.state.data.phone}
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
            value={this.state.data.profession_id}
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
            value={this.state.data.address}
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
            value={this.state.data.city}
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
            value={this.state.data.state}
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
            control={<Checkbox checked={this.state.areas.meio_ambiente}
                onChange={this.handleChangeCheck('meio_ambiente')} />}
            label="Meio Ambiente"
          />
          <FormControlLabel
            control={<Checkbox checked={this.state.areas.assistencia_social}
               onChange={this.handleChangeCheck('assistencia_social')} />}
            label="Assistência Social"
          />
          <FormControlLabel
            control={<Checkbox checked={this.state.areas.saude}
               onChange={this.handleChangeCheck('saude')} />}
            label="Saude"
          />
          <FormControlLabel
            control={<Checkbox checked={this.state.areas.habitacao}
               onChange={this.handleChangeCheck('habitacao')} />}
            label="Habitação"
          />
          <FormControlLabel
            control={<Checkbox checked={this.state.areas.dev_defesa_direito}
              onChange={this.handleChangeCheck('dev_defesa_direito')} />}
            label="Desenvolvimento e Defesa dos direitos"
          />
          <FormControlLabel
            control={<Checkbox checked={this.state.areas.educacao_pesquisa}
               onChange={this.handleChangeCheck('educacao_pesquisa')} />}
            label="Educação e pesquisa"
          />
          <FormControlLabel
            control={<Checkbox checked={this.state.areas.cultura}
               onChange={this.handleChangeCheck('cultura')} />}
            label="Cultura"
          />
        </FormGroup>
        <Typography variant="h5" align="center" style={{color: '#ec407a'}}>
          {this.state.error}
        </Typography>
        <FormButton
          className={classes.button}
          color="secondary"
          fullWidth
        >
          {'Atualizar'}
        </FormButton>
        <FormButton
          className={classes.buttonCancel}
          color="secondary"
          fullWidth
        >
          {'Cancelar'}
        </FormButton>
      </form>
          </React.Fragment>
          </AppForm>
        </If>
      </div>
    );
  }
}

ProfileVolunteer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ data: state.auth.accountdata, areas: state.auth.areas })
const enhance = compose(
  withRoot,
  withStyles(styles),
  connect(mapStateToProps),
)
export default enhance(ProfileVolunteer);
