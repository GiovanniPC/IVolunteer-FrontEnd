import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';

const Main = styled.div`
margin-top:80px;
display: flex;
`
const StyledFormTitle = styled.h1`
  font-weight:lighter;
`
const StyledTextField = styled(TextField)`
  width: 60%;

  @media (max-width: 900px) {
    width: 100%;
  }
`
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`
export { Main, StyledTextField, StyledForm, StyledFormTitle }
