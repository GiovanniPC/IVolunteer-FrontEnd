import {Table} from "semantic-ui-react";
import React from "react";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export function VehicleTableHeader(props) {
  const areas = {
    'meio-ambiente':'Meio Ambiente',
    'assistencia-social': 'Assistencia Social',
    'saude': 'Saúde',
    'habitacao': 'Habitação',
    'cultura': 'Cultura',
    'defesa-direito': 'Defesa e direitos',
    'educacao-pesquisa': 'Educação e Pesquisa'
  }
  return (
    <Table.Header>
      <Table.Row>
      <Table.HeaderCell width={2}>
          <FormControl>
            <Select
              value={props.area}
              onChange={props.handleChange}
            >{Object.keys(areas).map((key, value)=>(
              <MenuItem value={key} key={key}>{areas[key]}</MenuItem>
            ))}
            </Select>
          </FormControl>
        </Table.HeaderCell>
        <Table.HeaderCell width={3} sorted = {props.column === 'name' ? props.direction : null } onClick={() => props.handleSort('name')}>Nome</Table.HeaderCell>        
        <Table.HeaderCell width={2} sorted = {props.column === 'city' ? props.direction : null } onClick={() => props.handleSort('city')}>Cidade</Table.HeaderCell>
        <Table.HeaderCell width={1} sorted = {props.column === 'state' ? props.direction : null } onClick={() => props.handleSort('state')}>Estato</Table.HeaderCell>
        <Table.HeaderCell width={1} >Email</Table.HeaderCell>
        <Table.HeaderCell width={1} >Ver</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  )
}

