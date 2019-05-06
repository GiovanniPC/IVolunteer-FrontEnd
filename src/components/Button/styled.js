import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(Button)`

&&{
  background: ${props => props.background};
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  &:hover{
    background: ${props => props.background};
    opacity: 0.8;  
}

}`;

StyledButton.defaultProps = {

    background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
  }

export default StyledButton