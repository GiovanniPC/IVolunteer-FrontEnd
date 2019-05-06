import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Form from './form';
import If from '../../utils/if';
import Card from '../../components/Card';
import Paper from '../../components/paper';

export default class Login extends Component {

  constructor(props){
    super(props)
    this.state = { volunteer: false, ong: false }

    this.loginType = this.loginType.bind(this)
  }

  loginType(e){
    if (e === 'volunteer') {
      this.setState({ ...this.state, volunteer: true, ong: false })
    }
    if (e === 'ong') {
      this.setState({ ...this.state, volunteer: false, ong: true })
    }
  }

  render(){
  return(
    <Paper>
      <Grid container spacing={0} style={{flexDirection:'row'}}>
        <Grid item lg={6} md={6} xs={12} sm={6}>
        <If teste={this.state.ong}>
        <Form type='ong' colorButton='#ef5350'/>
        </If>
        <If teste={!this.state.ong}>
        <Card onClick={() => this.loginType('ong')} type="Ong"/>
        </If>
        </Grid>
        <Grid item lg={6} md={6} xs={12} sm={6}>
        <If teste={this.state.volunteer}>
        <Form type='volunteer' colorButton='#00e5ff'/>
        </If>
        <If teste={!this.state.volunteer}>
        <Card onClick={() => this.loginType('volunteer')} type="Volunteer"/>
        </If>
      </Grid>
    </Grid>
  </Paper>
  )
}
}
