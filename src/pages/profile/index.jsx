import React, {Component} from 'react'
import { connect } from 'react-redux';
import If from '../../utils/if';
import ProfileVolunteer from './volunteer';
import ProfileOng from './ong';

class Profile extends Component {

    render(){

      return(
        <div>
          <If teste={this.props.type === 'volunteer'}>
            <ProfileVolunteer/>
          </If>
          <If teste={this.props.type === 'ong'}>
            <ProfileOng/>
          </If>
        </div>
        )
    }
}
const mapStateToProps = state => ({ type: state.profile.type })
export default connect(mapStateToProps)(Profile)