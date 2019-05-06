import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import { changeMenu } from '../menu/actions';
import { logout } from '../../services/actions';
import If from '../../utils/if';

import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import {
  StyledList,
  StyledListItem,
  StyledListItemIcon,
  StyledListItemText
} from './styled';
import HomeIcon from '@material-ui/icons/Home';
import Info from '@material-ui/icons/Info';
import Exit from '@material-ui/icons/ExitToApp';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Person from '@material-ui/icons/Person';
import panda from '../../images/logo.png'

class SideBar extends Component {

render(){

  const { changeMenu, status, auth } = this.props

  const sideList = (
    <div>
      <StyledList>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <StyledListItem button key='IVolunteer'>
            <StyledListItemIcon href='#about'>
              <Avatar alt='user avatar' src={panda} />
            </StyledListItemIcon>
            <StyledListItemText primary='IVolunteer' />
          </StyledListItem>
        </Link>
        <Divider />
          <StyledListItem button key='Home'>
            <StyledListItemIcon>
              <HomeIcon />
            </StyledListItemIcon>
            <StyledListItemText primary='Home' />
          </StyledListItem>
      </StyledList>
      <StyledList>
        <StyledListItem button key='About'>
          <StyledListItemIcon>
            <Info />
          </StyledListItemIcon>
          <StyledListItemText primary='About' />
        </StyledListItem>
      </StyledList>
      <If teste={!auth}>
        <StyledList>
        <Link to='/login' style={{ textDecoration: 'none' }}>
          <StyledListItem button key='Logar'>
            <StyledListItemIcon>
              <Person />
            </StyledListItemIcon>
            <StyledListItemText primary='Logar' />
          </StyledListItem>
          </Link>
        </StyledList>
      </If>
      <If teste={!auth}>
        <StyledList>
        <Link to='/signup' style={{ textDecoration: 'none' }}>
          <StyledListItem button key='Cadastrar'>
            <StyledListItemIcon>
              <PersonAdd />
            </StyledListItemIcon>
            <StyledListItemText primary='Cadastrar' />
          </StyledListItem>
          </Link>
        </StyledList>
      </If>
      <If teste={auth}>
        <StyledList onClick={this.props.logout}>
          <StyledListItem button key='Sair'>
            <StyledListItemIcon>
              <Exit />
            </StyledListItemIcon>
            <StyledListItemText primary='Sair' />
          </StyledListItem>
        </StyledList>
      </If>
    </div>
  );

  return (
    <Drawer open={status} onClose={() => changeMenu(false)}>
      <div
        tabIndex={0}
        role="button"
        onClick={() => changeMenu(false)}
        onKeyDown={() => changeMenu(false)}
      >
        {sideList}
      </div>
    </Drawer>
    );
  }
}

const mapStateToProps = state => ({ status: state.menu.status, auth: state.auth.auth })
const mapDispatchToProps = dispatch =>
      bindActionCreators({ changeMenu, logout }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
