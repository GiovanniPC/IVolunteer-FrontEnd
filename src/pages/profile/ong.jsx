import React, {Component} from 'react'
import { connect } from 'react-redux';
import api from '../../services/api';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '../../components/paper';
import Button from '../../components/Button';
import { atuacao, states, jobs} from '../../utils/variables';
import If from '../../utils/if';
import {StyledTextField, 
        SelectBox,
        StyledSelect,
        StyledForm } from './styled';

class ProfileOng extends Component {

  constructor(props){
    super(props)

    this.editData = this.editData.bind(this)
  }
  state={edit: false, data:{} }

    editData(){
      this.setState({edit: true, data: this.props.accountdata })
    }

    handleChange = name => event => {
      console.log(this.state.data)
      console.log(name)
      const newvalue = this.state.data
      newvalue[name.res] = event.target.value
      this.setState({ data: newvalue });
    };

    handleChangeSelect = name => event => {
      const newvalue = this.state.data
      newvalue[name] = event.target.value
      this.setState({ data: newvalue }); 
    }
    handleUpdate = async e => {
      e.preventDefault();
      const { username, name, email, city, address, phone } = this.state.data;
      if( !username || !name || !email || !city || !address || !phone ){
        console.log('if')
        this.setState({ error: "Preencha todos os campos!" })
      }    
     else{
      const data = this.state.data
       try{
        await api.put(`/my-details`, {data});
        this.setState({edit: false})
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
                <StyledForm onSubmit={this.handleUpdate}>
                <Grid item md={12}>
                  <Typography component="h2" variant="display2" gutterBottom>Seus Dados Pessoais.</Typography>
                    {Object.keys(this.props.accountdata).map((res) => (
                      <If teste={(
                          res !== 'password' && 
                          res !== 'id' && 
                          res !== 'created_at' &&
                          res !== 'status'
                          )}>
                          <If teste={!this.state.edit}>
                            <Typography variant="h6" gutterBottom>{res}</Typography>
                            <If teste={res !== 'profession_id'}>
                            <Typography variant="body1" gutterBottom>{this.props.accountdata[res]}</Typography>
                            </If>
                            <If teste={res === 'profession_id'}>
                            <Typography variant="body1" gutterBottom>{jobs[this.props.accountdata[res]]}</Typography>
                            </If>
                          </If>
                          <If teste={this.state.edit}>
                            <If teste={ 
                            res === 'name' || 
                            res === 'username' || 
                            res === 'email' ||
                            res === 'city' ||
                            res === 'address' ||
                            res === 'phone' ||
                            res === 'cnpj' ||
                            res === 'responsavel' ||
                            res === 'descricao'
                            }>
                            <StyledTextField
                            label={res}
                            value={this.state.data[res]}
                            margin="normal"
                            onChange={this.handleChange({res})}
                            />
                            </If>
                          </If>
                      </If>
                    ))}
                      <If teste={this.state.edit}>
                        <SelectBox>
                        <InputLabel htmlFor="age-helper">State</InputLabel>
                        <StyledSelect
                          value={this.state.data.state}
                          onChange={this.handleChangeSelect('state')}
                        >
                        {states.map((index) => (
                        <MenuItem value={index}>{index}</MenuItem>
                        ))}
                        </StyledSelect>
                        </SelectBox>
                        <SelectBox>
                        <InputLabel htmlFor="age-helper">Area de atuação</InputLabel>
                          <StyledSelect
                            value={this.state.data.area_atuacao}
                            onChange={this.handleChangeSelect('area_atuacao')}
                          >
                          {atuacao.map((index) => (
                          <MenuItem value={index}>{index}</MenuItem>
                          ))}
                          </StyledSelect>
                        </SelectBox>
                      </If>
                </Grid>
                <If teste={!this.state.edit}>
                  <Button
                    text="Editar"
                    background="red"
                    onClick={this.editData}
                  />
                  </If>
                  <If teste={this.state.edit}>
                  <Button
                    text="Enviar"
                    background="red"
                    type="submit"
                  />
                  </If>
                </StyledForm>
              </Grid>
          </Paper>
        )
    }
}
const mapStateToProps = state => ({ accountdata: state.profile.accountdata, areas: state.profile.userAreas })
export default connect(mapStateToProps)(ProfileOng)