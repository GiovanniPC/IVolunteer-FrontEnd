import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';

class renderMenu extends Component {
  state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
    };
  
    handleProfileMenuOpen = event => {
      this.setState({ anchorEl: event.currentTarget });
    };

render(){
  const { anchorEl } = this.state;
  const isMenuOpen = Boolean(anchorEl);

 const renderMenu = (
    <Menu
    anchorEl={anchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isMenuOpen}
    onClose={this.handleMenuClose}
  >
    <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
    <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
  </Menu>
  )
export { renderMenu }

  return(
      <IconButton
          aria-owns={isMenuOpen ? 'material-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleProfileMenuOpen}
          color="inherit"
      >
          <AccountCircle />
      </IconButton>
  )
  }
}
