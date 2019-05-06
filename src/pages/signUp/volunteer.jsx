import React, {Component} from 'react';
import api from '../../services/api';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { StyledControlLabel, 
        StyledTextField, 
        SelectBox,
         StyledSelect,
         StyledForm } from './styled';
import Paper from '../../components/paper';
import Button from '../../components/Button';
import If from '../../utils/if';
import { jobs, states, areasformat } from '../../utils/variables';

class SignUpVolunteer extends Component {

    state = {
        name: "",
        username:"",
        password:"",
        email:"",
        birth:"2000-01-01",
        city:"",
        state:"Acre",
        profession_id:1,
        address:"",
        phone:"",
        error:"",
        error_area:"",
        saude:false,
        meio_ambiente:false,
        assistencia_social:false,
        cultura:false,
        dev_defesa_direito:false,
        educacao_pesquisa:false,
        habitacao:false
        }

    handleChange = name => event => {
        this.setState({ [name.field]: event.target.value });
      };

    handleChangeCheck = name => event => {
        this.setState({ [name]: event.target.checked })
    }
    handleChangeSelect = name => event => {
      this.setState({ [name]: event.target.value }); 
    }

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
        this.setState({ error_area: "Selecione pelo menos uma area!" })
      }       
     else{
       const data = this.state
       try{
        await api.post(`/signup/volunteer`, {data});
        this.props.history.push('/login')
       }catch (err) {
         console.log(err)
         this.setState({
           error: "Houve um error com o login, favor verifique suas credenciais."
         })
       }
     }
   }

    render(){
        return(
            <Paper margin='90px 20px'>
              <Grid container spacing={16}>
              <StyledForm onSubmit={this.handleSignUp}>
                <Grid item md={6}>
                  <Typography component="h2" variant="display2" gutterBottom>Seus Dados Pessoais.</Typography>
                  <Typography component="h6" variant="body2" gutterBottom>{this.state.error}</Typography>
                  {Object.keys(this.state).map((field) => (
                    <div>
                    <If teste={field === 'name' || 
                              field === 'username' || 
                              field === 'email' ||
                              field === 'city' ||
                              field === 'address' ||
                              field === 'phone'}>
                        <StyledTextField
                        label={field}
                        value={this.state[field]}
                        margin="normal"
                        onChange={this.handleChange({field})}
                        />
                    </If>
                    <If teste={field === 'password'}>
                       <StyledTextField
                        label={field}
                        value={this.state[field]}
                        type="password"
                        margin="normal"
                        onChange={this.handleChange({field})}
                        />
                    </If>
                    <If teste={field === 'birth'}>
                        <StyledTextField
                        label={field}
                        value={this.state[field]}
                        type="date"
                        margin="normal"
                        onChange={this.handleChange({field})}
                        />
                   </If>
                   <If teste={field ==='profession_id'}>
                   <SelectBox>
                    <InputLabel htmlFor="age-helper">Profession</InputLabel>
                    <StyledSelect
                      value={this.state.profession_id}
                      onChange={this.handleChangeSelect('profession_id')}
                    >
                    {Object.keys(jobs).map((index) => (
                    <MenuItem value={index}>{jobs[index]}</MenuItem>
                    ))}
                    </StyledSelect>
                  </SelectBox>
                  </If>
                  <If teste={field ==='state'}>
                  <SelectBox>
                   <InputLabel htmlFor="age-helper">State</InputLabel>
                   <StyledSelect
                    value={this.state.state}
                    onChange={this.handleChangeSelect('state')}
                  >
                  {states.map((index) => (
                  <MenuItem value={index}>{index}</MenuItem>
                  ))}
                  </StyledSelect>
                  </SelectBox>
                  </If>
                   </div>
                  ))}
                </Grid>
                <Grid item md={6}>
                  <Typography component="h2" variant="display2" gutterBottom>Escolha Suas Areas.</Typography>
                  <Typography component="h6" variant="body2" gutterBottom>{this.state.error_area}</Typography>
                  <FormGroup>
                  {Object.keys(areasformat).map((area) => (
                    <StyledControlLabel
                    control={
                        <Checkbox checked={this.state[area]} onChange={this.handleChangeCheck(area)}/>
                    }
                    label={areasformat[area]}
                    />
                  ))}
                </FormGroup>
                  <Button
                    text="Enviar"
                    background="red"
                    type="submit"
                  />
                </Grid>
                </StyledForm>
              </Grid>
          </Paper>
        )
    }
}
export default withRouter(SignUpVolunteer)