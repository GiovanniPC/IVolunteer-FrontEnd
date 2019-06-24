import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Visibility from '@material-ui/icons/Visibility'
import Check from '@material-ui/icons/Check';
import Cancel from '@material-ui/icons/Close';
import api from '../../../services/api';
import { areasformat } from '../../../utils/variables';
import Modal from './Modal';
import If from '../../../utils/if';

const styles = theme =>({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
      },
      table: {
        minWidth: 700,
      },
})

class CustomizedTables extends Component{
    state={
        open:false,
        detalhes_conta:'',
        list:''
    }

    getProfileData = async (id) =>{
        try{
            const response = await api.get(`/account-details/${id}`);
            console.log(response)
            if('volunteer' in response.data){
               const areas=[]
                Object.keys(areasformat).map(key  => {
                 if(response.data[key]) {
                   areas.push(areasformat[key])
                 }
               });
            const res = this.AreaList(areas);
            this.setState({detalhes_conta: response.data.volunteer, list: res});
            }
            if('data_abertura' in response.data){
            this.setState({detalhes_conta: response.data})
            }
            this.handleOpen()
        }catch (err) {
            console.log(err)
        }
    };
    
    AreaList(props) {
        const numbers = props;
        const listItems = numbers.map((number) =>
          <Typography key={number.toString()} variant="h5">
            {number}
          </Typography>
        );
        return (
          listItems
        );
      }
    aceitaSolicitacao = async row => {
        const data = {}
        data['status'] = true
        data['event_id'] = row.event.id
        data['ong_id'] = row.ong.ong_id
        data['volunteer_id'] = row.volunteer.volunteer_id
        try{
            const response = await api.put(`/orders/${row.id}`,{data});
            console.log(response)
            this.props.update()
        }catch (err) {
            console.log(err)
        }
    };
    
    removeSolicitacao = async id => {
        try{
            const response = await api.delete(`/orders/${id}`);
            console.log(response)
            this.props.update()
        }catch (err) {
            console.log(err)
        }
    };

    handleOpen = () => {
        this.setState({open: true})
    }

    handleClose = () =>{
        this.setState({open: false})
    }
    render(){
        console.log(this.props)
        const { classes } = this.props;
        const StyledTableCell = withStyles(theme => ({
            head: {
                backgroundColor: theme.palette.common.black,
                color: theme.palette.common.white,
            },
            body: {
                fontSize: 14,
            },
            }))(TableCell);
            
        const StyledTableRow = withStyles(theme => ({
        root: {
            '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
            },
        },
        }))(TableRow);
    return (
        <Paper className={classes.root}>
        <Table className={classes.table}>
            <TableHead>
            <TableRow>
                <StyledTableCell>Evento</StyledTableCell>
                <StyledTableCell >Nome</StyledTableCell>
                <StyledTableCell >Status</StyledTableCell>
                <StyledTableCell >Ver</StyledTableCell>
                <StyledTableCell >Ações</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {this.props.solicitacoes.map(row => (
                <StyledTableRow key={row}>
                    <If teste={this.props.tipo === 'ong'}>
                        <StyledTableCell component="th" scope="row">
                            {row.event.title}
                        </StyledTableCell>
                        <StyledTableCell >{row.volunteer.name}</StyledTableCell>
                        <StyledTableCell >{row.status ? 'Aceito':'Pendente'}</StyledTableCell>
                        <StyledTableCell>
                            <Button onClick={() => this.getProfileData(row.volunteer.id)}>
                            <Visibility 
                                style={{color:'#03a9f4'}}/>
                            </Button>
                        </StyledTableCell>
                        <If teste={!row.status}>
                            <StyledTableCell > 
                                <Button onClick={() => this.aceitaSolicitacao(row)}>
                                    <Check style={{color:'#00e676'}}/>
                                </Button>
                                <Button onClick={() => this.removeSolicitacao(row.id)}>
                                    <Cancel style={{color:'#ec407a'}}/> 
                                </Button>
                            </StyledTableCell>
                        </If>
                    </If>
                    <If teste={this.props.tipo === 'volunteer'}>
                        <StyledTableCell component="th" scope="row">
                            {row.event.title}
                        </StyledTableCell>
                        <StyledTableCell >{row.ong.name}</StyledTableCell>
                        <StyledTableCell >{row.status ? 'Aceito':'Pendente'}</StyledTableCell>
                        <StyledTableCell> 
                        <Button onClick={() => this.getProfileData(row.ong.id)}>
                            <Visibility style={{color:'#03a9f4'}}/>
                            </Button>
                        </StyledTableCell>
                        <If teste={!row.status}>
                            <StyledTableCell > 
                            <Button onClick={() => this.removeSolicitacao(row.id)}>
                                <Cancel style={{color:'#ec407a'}}/> 
                            </Button>
                            </StyledTableCell>
                        </If>
                    </If>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        <Modal 
          open={this.state.open}
          handleClose={this.handleClose}
          address={this.state.detalhes_conta.address}
          name={this.state.detalhes_conta.name}
          email={this.state.detalhes_conta.email}
          phone={this.state.detalhes_conta.phone}
          area_atuacao={this.state.detalhes_conta.area_atuacao}
          profession={this.state.detalhes_conta.profession_id}
          responsavel={this.state.detalhes_conta.responsavel}
          areas_conta={this.state.list}
          descricao={this.state.detalhes_conta.descricao}
          modal='profile'
        />
        </Paper>
    )};
}
CustomizedTables.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  const SimpleTable = withStyles(styles)(CustomizedTables);
export default SimpleTable