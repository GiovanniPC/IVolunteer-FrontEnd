import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import If from '../../utils/if';
import Volunteer from './volunteer';
import Ong from './ong';
import Card from '../../components/Card';
import Paper from '../../components/paper';

export default class Signup extends Component {

  constructor(props){
    super(props)
    this.state = { volunteer: false, ong: false }

    this.signUp = this.signUp.bind(this)
  }

  signUp(e){
    if (e === 'volunteer') {
      this.setState({ ...this.state, volunteer: true, ong: false })
    }
    if (e === 'ong') {
      this.setState({ ...this.state, volunteer: false, ong: true })
    }
  }

  render(){
  return(
      <div>
    <If teste={!this.state.volunteer && !this.state.ong}>
    <Paper>
      <Grid container spacing={0} style={{flexDirection:'row'}}>
        <Grid item lg={6} md={6} xs={12} sm={6}>
           <Card onClick={() => this.signUp('ong')} type="Ong"/>
        </Grid>
        <Grid item lg={6} md={6} xs={12} sm={6}>
            <Card onClick={() => this.signUp('volunteer')} type="Volunteer"/>
        </Grid>
    </Grid>
  </Paper>
  </If>
  <If teste={this.state.volunteer}>
    <Volunteer/>
  </If>
  <If teste={this.state.ong}>
    <Ong/>
  </If>
  </div>
  )
}
}
