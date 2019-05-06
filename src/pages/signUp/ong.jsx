import React, {Component} from 'react';
import api from '../../services/api';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { StyledTextField, 
         SelectBox,
         StyledSelect,
         StyledForm } from './styled';
import Paper from '../../components/paper';
import Button from '../../components/Button';
import If from '../../utils/if';
import { atuacao, states } from '../../utils/variables';

class SignUpOng extends Component {

    state = {
        name: "",
        username:"",
        password:"",
        cnpj:"",
        email:"",
        data_abertura:"2000-01-01",
        city:"",
        state:"Acre",
        responsavel:"",
        address:"",
        phone:"",
        error:"",
        area_atuacao:"Saude",
        descricao:""
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
     else{
       const data = this.state
       try{
         await api.post(`/signup/ong`, {data});
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
                <Grid item md={12}>
                  <Typography component="h2" variant="display2" gutterBottom>Seus Dados Pessoais.</Typography>
                  <Typography component="h6" variant="body2" gutterBottom>{this.state.error}</Typography>
                  {Object.keys(this.state).map((field) => (
                    <div>
                    <If teste={field === 'name' || 
                              field === 'username' ||
                              field === 'cnpj' || 
                              field === 'email' ||
                              field === 'city' ||
                              field === 'address' ||
                              field === 'phone' ||
                              field === 'descricao' ||
                              field === 'responsavel'}>
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
                    <If teste={field === 'data_abertura'}>
                        <StyledTextField
                        label={field}
                        value={this.state[field]}
                        type="date"
                        margin="normal"
                        onChange={this.handleChange({field})}
                        />
                   </If>
                   <If teste={field ==='area_atuacao'}>
                   <SelectBox>
                    <InputLabel htmlFor="age-helper">Area de atuação</InputLabel>
                    <StyledSelect
                      value={this.state.area_atuacao}
                      onChange={this.handleChangeSelect('area_atuacao')}
                    >
                    {atuacao.map((index) => (
                    <MenuItem value={index}>{index}</MenuItem>
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
export default withRouter(SignUpOng)