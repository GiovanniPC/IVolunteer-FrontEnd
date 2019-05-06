import React from 'react'
import Paper from '../../components/paper';
import panda from '../../images/red_panda.jpg';
import Main from './styled';

export default props => (

  <Main>
    <img src={panda} alt="panda" />
    <Paper margin='10px 0'>
      <div>
        <h2>Nossa História</h2>
        <p>Lorem ipsum dolor sit amet...</p>
        <h2>Missão e Visão</h2>
        <p>Lorem ipsum dolor sit amet...</p>
        <h2>Imprensa</h2>
        <p>Lorem ipsum dolor sit amet...</p>
      </div>
    </Paper>
  </Main>
)
