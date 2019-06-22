import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import api from '../../../../services/api';
import moment from 'moment';
import Modal from '../Modal';
import ModalEventos from '../ModalEventos';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import If from '../../../../utils/if';
require('./style.css');

class EventCalendar extends Component {

    state={
        openNewEvent: false,
        openViewEvent: false,
        events:[],
        eventDetails:'',
    };
    componentDidMount(){
        this.loadEvents()
    }
    
    viewEventDetails = async value =>{
      try{
        const response = await api.get(`/events/${value.id}`);
        this.setState({ eventDetails: response.data, openViewEvent: true })
      }catch (err) {
        this.setState({
          error: "Houve um error."
        })
      }

    }

    eventDetailsClose = () => {
      this.setState({ openViewEvent: false });
      };

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
        this.setState({ openNewEvent: true });
      };
    
    handleClose = () => {
    this.setState({ openNewEvent: false });
    };

    render(){
    const localizer = momentLocalizer(moment)
    return(
    <Paper
    style={{padding: 20, height: '100vh' }}>
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
        onSelectEvent={(target) => this.viewEventDetails(target) }
        />
        <Modal
            open={this.state.openNewEvent}
            handleClose={this.handleClose}
            loadEvents={this.loadEvents}
            modal='events'
        />
        <ModalEventos
            open={this.state.openViewEvent}
            handleClose={this.eventDetailsClose}
            title={this.state.eventDetails.title}
            description={this.state.eventDetails.description}
            start={this.state.eventDetails.start}
            end={this.state.eventDetails.end}
            ong_name={this.state.eventDetails.ong_name}
            ong_id={this.state.eventDetails.ong_id}
            id={this.state.eventDetails.id}
        />
    </Paper>
)}
}
const mapStateToProps = state => ({ tipo: state.auth.tipo })
export default connect(mapStateToProps) (EventCalendar)