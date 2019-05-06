import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '../components/paper';
import ListaCard from '../components/List';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = {
    card: {
    maxWidth: 345,
    },
    media: {
    objectFit: 'cover',
    },
};

class ListIndex extends Component {
    
    state={
        lista:'',
        filterval: '',
    }
    
    createList = async (val) =>{
        try{
            const response = await api.get(`/${val}`);
            this.setState({ lista: response.data, filterval: val })
          }catch (err) {
            console.log(err)
          }
    }
    handleChange = event => {
        this.createList(event.target.value)
      };
    render(){
    
    const cards = {
        first:{
            title: "Saude",
            sub: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            click:"saude"
        },second:{
            title: "Cultura",
            sub: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            click:"cultura"
        },three:{
            title: "Habitação",
            sub: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            click:"habitacao"
        },four:{
            title: "Defesa dos Direitos",
            sub: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            click:"defesa-direito"
        },five:{
            title: "Educação e Pesquisa",
            sub: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            click:"educacao-pesquisa"
        },six:{
            title: "Assistencia Social",
            sub: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            click:"assistencia-social"
        },seven:{
            title: "Meio Ambiente",
            sub: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            click:"meio-ambiente"
        }
    };
    const { classes } = this.props;
    if(!this.state.lista){
        return (
        <Paper>
            <Grid container spacing={16} style={{display: 'flex', justifyContent: 'center'}}>
            {Object.keys(cards).map((res,value) => (
                <Grid key={value} item md={3} xs={12}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            {/* <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            className={classes.media}
                            height="140"
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                            /> */}
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {cards[res].title}
                            </Typography>
                            <Typography component="p">
                                {cards[res].sub}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" onClick={() => this.createList(cards[res].click)}>
                            Ver Todos.
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
        </Paper>
        );
    }
    if(this.state.lista){
        return (
        <Paper>
            <Grid container spacing={16}>
            <Grid item md={4} xs={12}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Areas de Atuação.</FormLabel>
                    <RadioGroup
                        aria-label="Areas"
                        name="areas"
                        value={this.state.filterval}
                        onChange={this.handleChange}
                    >
                    {Object.keys(cards).map((res, value) => (
                    <FormControlLabel key={value} value={cards[res].click} control={<Radio />} label={cards[res].title}/>
                    ))}
                </RadioGroup>
                </FormControl>
            </Grid>
                <Grid item md={4} xs={12}>
                    <ListaCard lista={this.state.lista}/>
                </Grid>
            </Grid>
        </Paper>
        )}
    }
}
ListIndex.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListIndex);