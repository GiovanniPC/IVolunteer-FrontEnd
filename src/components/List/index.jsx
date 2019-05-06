import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import api from '../../services/api';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Paper from '../paper';
import Modal from '../Modal';
import { GetOneRandomColor } from '../../theme/colorsTheme';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class CheckboxListSecondary extends React.Component {

    state={
        open: false,
        data: ''
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
    this.setState({ open: false });
    };
    getProfileData = async (id) =>{
        try{
            const response = await api.get(`/account-details/${id}`);
            if('volunteer' in response.data) this.setState({data: response.data.volunteer})
            else this.setState({data: response.data})
            console.log(response.data)
            this.handleOpen()
          }catch (err) {
            console.log(err)
          }
    }
  render() {
    const { classes } = this.props;
    const { name, email, profession_id, responsavel, phone } = this.state.data
    return (
    <Paper margin='0'>
      <List dense className={classes.root}>
        {this.props.lista.map(value => (
          <ListItem key={value.id} button onClick={() => this.getProfileData(value.id)}>
            <ListItemAvatar>
                <Avatar style={{background: GetOneRandomColor()}}
                >{value.name[0].toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={value.name.toUpperCase()} />
          </ListItem>
        ))}
      </List>
        <Modal 
        open={this.state.open}
        handleClose={this.handleClose}
        name={name}
        email={email}
        phone={phone}
        profession={profession_id}
        responsavel={responsavel}
        />
      </Paper>
      
    );
  }
}

CheckboxListSecondary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxListSecondary);