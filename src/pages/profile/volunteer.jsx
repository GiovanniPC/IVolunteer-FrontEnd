import React, {Component} from 'react'
import { connect } from 'react-redux';
import api from '../../services/api';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '../../components/paper';
import Button from '../../components/Button';
import { areasformat, states, jobs} from '../../utils/variables';
import If from '../../utils/if';
import { StyledControlLabel, 
        StyledTextField, 
        SelectBox,
        StyledSelect,
        StyledForm } from './styled';

class ProfileVolunteer extends Component {

  constructor(props){
    super(props)

    this.editData = this.editData.bind(this)
  }
  state={edit: false, data:{}, areas:{}}

    editData(){
      this.setState({edit: true, data: this.props.accountdata.volunteer, areas: this.props.accountdata})
    }

    handleChange = name => event => {
      const newvalue = this.state.data
      newvalue[name.res] = event.target.value
      this.setState({ data: newvalue });
    };

    handleChangeCheck = name => event => {
      const newvalue = this.state.areas
      newvalue[name] = event.target.checked
        this.setState({ areas: newvalue })
    }
    handleChangeSelect = name => event => {
      const newvalue = this.state.data
      newvalue[name] = event.target.value
      this.setState({ data: newvalue }); 
    }
    handleUpdate = async e => {
      const data = this.state.areas
      data['volunteer'] = this.state.data
      e.preventDefault();
     const { username, password, name, email, city, address,phone } = data.volunteer;
      if( !username || !password || !name || !email || !city || !address || !phone ) {
        this.setState({ error: "Preencha todos os campos!" })
      }
      const { saude, meio_ambiente, assistencia_social, 
        cultura, dev_defesa_direito,educacao_pesquisa, habitacao } = data;
      if( !saude && !meio_ambiente && !assistencia_social && 
      !cultura && !dev_defesa_direito && !educacao_pesquisa && !habitacao ) {
        this.setState({ error_area: "Selecione pelo menos uma area!" })
      }       
     else{
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
                <Grid item md={6}>
                  <Typography component="h2" variant="display2" gutterBottom>Seus Dados Pessoais.</Typography>
                    {Object.keys(this.props.accountdata.volunteer).map((res) => (
                      <If teste={(
                          res !== 'password' && 
                          res !== 'id' && 
                          res !== 'created_at' &&
                          res !== 'status'
                          )}>
                          <If teste={!this.state.edit}>
                            <Typography variant="h6" gutterBottom>{res}</Typography>
                            <If teste={res !== 'profession_id'}>
                            <Typography variant="body1" gutterBottom>{this.props.accountdata.volunteer[res]}</Typography>
                            </If>
                            <If teste={res === 'profession_id'}>
                            <Typography variant="body1" gutterBottom>{jobs[this.props.accountdata.volunteer[res]]}</Typography>
                            </If>
                          </If>
                          <If teste={this.state.edit}>
                            <If teste={ 
                            res === 'name' || 
                            res === 'username' || 
                            res === 'email' ||
                            res === 'city' ||
                            res === 'address' ||
                            res === 'phone'}>
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
                        <InputLabel htmlFor="age-helper">Profession</InputLabel>
                        <StyledSelect
                          value={this.state.data.profession_id}
                          onChange={this.handleChangeSelect('profession_id')}
                        >
                        {Object.keys(jobs).map((index) => (
                        <MenuItem value={index}>{jobs[index]}</MenuItem>
                        ))}
                        </StyledSelect>
                        </SelectBox>
                      </If>
                </Grid>
                <Grid item md={6}>
                  <Typography component="h2" variant="display2" gutterBottom>Suas Areas.</Typography>
                  <If teste={!this.state.edit}>
                    {Object.keys(this.props.accountdata).map((res) => (
                      <If teste={this.props.accountdata[res]}>
                        <Typography variant="body1" gutterBottom>{areasformat[res]}</Typography>
                      </If>
                    ))}
                  </If>
                  <If teste={this.state.edit}>
                  <Typography component="h6" variant="body2" gutterBottom>{this.state.error_area}</Typography>
                  <FormGroup>
                  {Object.keys(areasformat).map((area) => (
                    <StyledControlLabel
                    control={
                        <Checkbox checked={this.state.areas[area]} onChange={this.handleChangeCheck(area)}/>
                    }
                    label={areasformat[area]}
                    />
                  ))}
                </FormGroup>
                  </If>
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
                </Grid>
                </StyledForm>
              </Grid>
          </Paper>
        )
    }
}
const mapStateToProps = state => ({ accountdata: state.profile.accountdata, areas: state.profile.userAreas })
export default connect(mapStateToProps)(ProfileVolunteer)