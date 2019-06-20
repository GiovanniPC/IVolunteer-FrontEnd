import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userData } from '../services/action';
import { withStyles } from '@material-ui/core/styles';
import compose from '../utils/compose';
import If from '../utils/if';
import ProfileOng from './ProfileOng';
import ProfileVolunteer from './ProfileVolunteer';

const styles = theme => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(1),
  },
});

class Profile extends React.Component {
  state = {
    sent:false,
  };

  componentDidMount(){
    this.loadUserData()
  }

  editUserData = () => {
    this.loadUserData()
    this.setState({sent: true})
  }

  loadUserData = async () => {
  try{
    const response = await api.get(`/my-details`);
      this.props.userData(response)
  }catch (err) {
    this.setState({
      error: "Houve um error."
    })
  }
}



  SentUpdate = () => {
    this.loadUserData()
    this.setState({sent: false})
  }

  render() {
    return (
      <div>
        <React.Fragment>
        <AppAppBar />
        <If teste={this.props.tipo === "ong"}>
          <ProfileOng/>
        </If>
        <If teste={this.props.tipo === "volunteer"}>
          <ProfileVolunteer/>
        </If>
      <AppFooter/>
      </React.Fragment>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ tipo: state.auth.tipo })
const mapDispatchToProps = dispatch =>
       bindActionCreators({ userData }, dispatch)
const enhance = compose(
  withRoot,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  )
export default enhance(Profile);
