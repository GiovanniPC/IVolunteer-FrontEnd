import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import api from '../../../../services/api';
import moment from 'moment';
import Modal from '../Modal'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import If from '../../../../utils/if';
require('./style.css');

class EventCalendar extends Component {

    state={
        open: false,
        events:[]
    };
    componentDidMount(){
        this.loadEvents()
    }
    
    loadEvents = async () => {
      try{
        const response = await api.get(`/events`);
        this.setState({events: response.data})
      }catch (err) {
        this.setState({
          error: "Houve um error."
        })
      }
    }
    handleOpen = () => {
        console.log('open')
        this.setState({ open: true });
      };
    
      handleClose = () => {
    this.setState({ open: false });
    };

    render(){
    const localizer = momentLocalizer(moment)
    return(
    <Paper
    style={{padding: 20}}>
        <If teste={this.props.tipo === 'ong'}>
            <Button 
            variant="contained" 
            color="primary"
            style={{ marginBottom: 10 }}
            onClick={this.handleOpen}>
                Criar evento
            </Button>
        </If>
        <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        views={['month', 'agenda']}
        events={this.state.events}
        onSelectEvent={(target) => console.log(target) }
        />
        <Modal
            open={this.state.open}
            handleClose={this.handleClose}
            loadEvents={this.loadEvents}
            modal='events'
        />
    </Paper>
)}
}
const mapStateToProps = state => ({ tipo: state.auth.tipo })
export default connect(mapStateToProps) (EventCalendar)