import React, { Component } from 'react';
import api from '../../services/api';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { sendLogin } from '../../services/actions';
import { StyledForm, StyledTextField, StyledFormTitle } from './styled';
import Button from '../../components/Button';

class Form extends Component{

   state = {
     username: "",
     password: "",
     error: ""
   };

  handleSignIn = async e => {
    e.preventDefault();
   const { username, password } = this.state;
   if(!username || !password) {
     this.setState({ error: "Preencha todos os campos!" })
   }
   else{
     try{
       const response = await api.post(`/login/${this.props.type}`, {username, password});
       this.props.sendLogin(response.data);
       this.props.history.push('/')
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

      <StyledForm onSubmit={this.handleSignIn}>
        <StyledFormTitle>
          {this.state.error}
        </StyledFormTitle>
        <StyledFormTitle>
          {this.props.type}
        </StyledFormTitle>
        <StyledTextField
          id="standard-name"
          label="Username"
          onChange={e => this.setState({ username: e.target.value })}
          margin="normal"
        />
      <StyledTextField
          id="standard-password-input"
          type="password"
          label="Password"
          onChange={e => this.setState({ password: e.target.value })}
          margin="normal"
        />
      <Button
        text="login"
        background={this.props.colorButton}
        type="submit"
        />
    </StyledForm>
    )
  }
}
const mapStateToProps = state => ({ token: state.auth.token })
const mapDispatchToProps = dispatch =>
      bindActionCreators({ sendLogin }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Form))