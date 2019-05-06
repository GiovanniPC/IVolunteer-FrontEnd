import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import api from '../../services/api';

import { changeMenu } from './actions';
import { userData }  from '../../pages/profile/action';
import { GetOneRandomColor } from '../../theme/colorsTheme';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from '../sidebar';
import If from '../../utils/if';
import {
    StyledDiv,
    StyledBar,
    StyledToolbar,
    StyledTypography,
    StyledIcon
} from './styled';

class Nav extends Component{


  toggleDrawer(open){
    this.setState({ ...this.state, drawer: open });
  };

  viewProfile = async e => {
    try{
        const response = await api.get(`/my-details`);
        this.props.userData(response.data)
        this.props.history.push('/profile')
      }catch (err) {
        console.log(err)
      }
}

render(){

  const { changeMenu, auth } = this.props
    
    return (
        <StyledDiv>
          <StyledBar>
            <StyledToolbar>
              <StyledIcon onClick={() => changeMenu(true)} color='inherit' arial-label='Menu'>
                  <MenuIcon/>
              </StyledIcon>
              <StyledTypography variant="h6" color="inherit">
                IVolunteer
              </StyledTypography>
              <If teste={auth}>
                <IconButton onClick={this.viewProfile}>
                  <Avatar style={{backgroundColor:GetOneRandomColor()}}>V</Avatar>
                </IconButton>
              </If>
            </StyledToolbar>
          </StyledBar>
          <Sidebar/>
        </StyledDiv>
      )
    }
}

const mapStateToProps = state => ({ status: state.menu.status, name: state.auth.name, auth: state.auth.auth })
const mapDispatchToProps = dispatch =>
      bindActionCreators({ changeMenu, userData }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav))