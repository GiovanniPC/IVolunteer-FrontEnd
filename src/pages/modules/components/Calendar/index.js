import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import api from '../../../../services/api';
import moment from 'moment';
import 'moment/locale/pt-br'
import Modal from '../Modal';
import ModalEventos from '../ModalEventos';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Table from '../SimpleTable';
import { isAuthenticated } from '../../../../services/auth';
import If from '../../../../utils/if';
require('./style.css');

class EventCalendar extends Component {

  state={
      openNewEvent: false,
      openViewEvent: false,
      events:[],
      eventDetails:'',
      show:'agenda',
      solicitacoes:'',
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
      const format=[]
      for(const i in response.data){
        response.data[i].start = moment(response.data[i].start).add(3, 'hour')._d
        response.data[i].end = moment(response.data[i].end).add(3, 'hour')._d
        format.push(response.data[i])
      }
      this.setState({events: format})
    }catch (err) {
      this.setState({
        error: "Houve um error."
      })
    }
  }

handleChange = async event => {
  if(event.target.value === 'solicitacoes'){
    try{
      const response = await api.get(`/orders`);
      this.setState({ solicitacoes: response.data })
    }catch (err) {
      this.setState({
        error: "Houve um error."
      })
    }
  }
  this.setState({show: event.target.value })
}
  
updateSolicitacoes = async () => {
  try{
    const response = await api.get(`/orders`);
    this.setState({ solicitacoes: response.data })
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
  const messages = {
    allDay: 'Dia todo',
    previous: '<',
    next: '>',
    today: 'Hoje',
    month: 'Mês',
    week: 'Semana',
    day: 'Dia',
    agenda: 'Agenda',
    date: 'Data',
    time: 'Hora',
    event: 'Evento',
  };
  return(
  <Paper
  style={{padding: 20, height: '100vh' }}>
      <If teste={isAuthenticated()}>
        <FormControl
          syle={{
            display:'flex',
            alignItems: 'center',
          }}>
          <Select
          style={{marginRight: 20}}
            value={this.state.show}
            onChange={this.handleChange}
          >
            <MenuItem value={'agenda'} key={'agenda'}>Agenda</MenuItem>
            <MenuItem value={'solicitacoes'} key={'solicitacoes'}>Solicitações</MenuItem>
          </Select>
        </FormControl>
        <If teste={this.props.tipo === 'ong'}>
          <Button 
          variant="contained" 
          color="primary"
          style={{ marginBottom: 10 }}
          onClick={this.handleOpen}>
              Criar evento
          </Button>
        </If>
      </If>
      <If teste={this.state.show === 'agenda'}>
      <Calendar
      localizer={localizer}
      defaultDate={new Date()}
      views={['month','week','day','agenda']}
      events={this.state.events}
      startAccessor={'start'}
      endAccessor={'end'}
      messages={messages}
      onSelectEvent={(target) => this.viewEventDetails(target) }
      />
      </If>
      <If teste={this.state.show === 'solicitacoes'}>
        <Table
          update={this.updateSolicitacoes}
          solicitacoes={this.state.solicitacoes}
          tipo={this.props.tipo}
        />
      </If>
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