import React from 'react'
import StyledButton from './styled'

export default props => (

    <StyledButton
      color={props.color}
      background={props.background}
      onClick={props.onClick}
      type={props.type}>
        {props.text}
    </StyledButton>

)
