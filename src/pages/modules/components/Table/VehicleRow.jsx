import React from "react";
import {Button, Table} from "semantic-ui-react";
import PropTypes from "prop-types";

export const VehicleRow = (props) => (
  <Table.Row>
    <Table.Cell>{props.vehicle.id}</Table.Cell>
    <Table.Cell>{props.vehicle.name}</Table.Cell>
    <Table.Cell>{props.vehicle.city}</Table.Cell>
    <Table.Cell>{props.vehicle.state}</Table.Cell>
    <Table.Cell>{props.vehicle.email}</Table.Cell>
    <Table.Cell textAlign='center'>
      <Button
        onClick={() => props.addFavorite(props.vehicle.id)}
        color={props.vehicle.favorite? 'google plus' : 'twitter'}
        icon={props.vehicle.favorite ? 'eye' : 'eye'} />
    </Table.Cell>
  </Table.Row>
);

VehicleRow.propTypes = {
  vehicle: PropTypes.object.isRequired,
  addFavorite: PropTypes.func.isRequired,
};
