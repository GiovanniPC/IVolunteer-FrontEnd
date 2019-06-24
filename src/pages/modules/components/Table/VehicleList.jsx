import React from 'react';
import {Segment} from 'semantic-ui-react';
import { areasformat } from '../../../../utils/variables';
import {VehicleTable} from './VehicleTable.jsx';
import Modal from '../../components/Modal';
import Typography from '@material-ui/core/Typography';

import api from '../../../../services/api';

const queryParams = ['_limit','_order','_sort','q','_page'];

export default class VehicleList extends React.Component {
  constructor() {
    super();
    this.state = {
      vehicles: [],
      _sort: 'id',
      _page: 1,
      _order: null,
      _limit: 10,
      q: '',
      totalCount: 0,
      loading: false,
      data: [],
      area:'',
      detalhes_conta:'',
      areas_conta:'',
      open: false,
      list:'',
    };
    this.loadData = this.loadData.bind(this);
    this.onChangeLimit = this.onChangeLimit.bind(this);
    this.onSubmitFilter = this.onSubmitFilter.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.getProfileData = this.getProfileData.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  directionConverter(order) {
    if (order === 'asc') {
      return 'ascending';
    } else if (order === 'desc') {
      return 'descending';
    } else {
      return null;
    }
  }

  componentWillMount = async () => {
    try{
      const response = await api.get(`/${this.props.area}`);
      this.setState({data: response.data})
    }catch (err) {
      console.log(err)
      this.setState({
        error: "Houve um error."
      })
    }
  }

  handleSort(clickedColumn) {
    const { _sort, _order } = this.state;

    let newOrder = _order === 'asc' ? 'desc' : 'asc';
    if (_sort !== clickedColumn) {
      newOrder = 'asc';
    }

    this.setState({
      _sort: clickedColumn,
      _page: 1,
      _order: newOrder,
    });

    this.loadData({
      _sort: clickedColumn,
      _page: 1,
      _order: newOrder,
    });
  }

  componentDidMount() {
    this.setState({area: this.props.area})  
    this.loadData({});
  }

  onChangeLimit(event, data) {
    if (data.value !== this.state._limit) {
      this.setState({ _limit: data.value, _page: 1  });
      this.loadData({ _limit: data.value, _page: 1  });
    }
  }

  handleChange = async (event) => {
    const request = await api.get(`/${event.target.value}`)
    this.props.change(event.target.value)
    this.setState({
      area: event.target.value,
      data: request.data
    })
  }

  onSubmitFilter = async (filter) => {
    if (filter !== this.state.q) {
      this.setState({ q: filter, _page: 1, loading: true });
      this.loadData({ q: filter, _page: 1 });
    }
  }

  onChangePage(event, data) {
    const {activePage} = data;
    if (activePage !== this.state._page) {
      this.setState({ _page: activePage });
      this.loadData({ _page: activePage });
    }
  }

getProfileData = async (id) =>{
  try{
      const response = await api.get(`/account-details/${id}`);
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

handleOpen = () => {
  this.setState({ open: true});
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
handleClose = () => {
this.setState({ open: false });
};
  loadData = async (params) => {
    const current = this.state;
    queryParams.forEach(function(element) {
      if (!(element in params)) {
        params[element] = current[element];
      }
    });

    const esc = encodeURIComponent;
    const query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');

    let totalCountQuery = '';
    if (params.q !== "") {
      totalCountQuery = `q=${params.q}`;
    }
    try{
      const response = await api.get(`/${this.props.area}?${totalCountQuery}`);
      this.setState({ totalCount: response.data.length });
    }catch (err) {
      console.log(err)
      this.setState({
        error: "Houve um error."
      })
    }
    try{
      const response = await api.get(`/${this.props.area}?` + query);
      this.setState({ data: response.data });
    }catch (err) {
      console.log(err)
      this.setState({
        error: "Houve um error."
      })
    }
  }

  render() {
    const { name, email, profession_id, responsavel, phone, address, area_atuacao, descricao } = this.state.detalhes_conta

    return (
      <Segment>
        <VehicleTable
          vehicles = { this.state.data }
          totalCount = {this.state.totalCount }
          totalPages = { Math.ceil(this.state.totalCount / this.state._limit) }
          currentPage = { this.state._page }
          onChangePage = { this.onChangePage }
          getProfileData = { this.getProfileData }
          column = { this.state._sort }
          direction = { this.directionConverter(this.state._order) }
          handleSort = { this.handleSort }
          handleChange = {this.handleChange}
          onChangeLimit = { this.onChangeLimit }
          limit = { this.state._limit.toString() }
          area = { this.state.area }
        />
        <Modal 
          open={this.state.open}
          handleClose={this.handleClose}
          address={address}
          name={name}
          email={email}
          phone={phone}
          area_atuacao={area_atuacao}
          profession={profession_id}
          responsavel={responsavel}
          descricao={descricao}
          areas_conta={this.state.list}
          modal='profile'
        />
      </Segment>
    )
  }
}
