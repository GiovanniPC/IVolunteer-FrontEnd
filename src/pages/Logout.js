import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../services/action';

class Logout extends Component {

  componentWillMount() {
    this.props.logout()
    this.props.history.push('/sign-in')
  }

  render() {
    return null
  }
}

const mapDispatchToProps = dispatch =>
       bindActionCreators({ logout }, dispatch)
export default withRouter(connect(null,mapDispatchToProps)(Logout))