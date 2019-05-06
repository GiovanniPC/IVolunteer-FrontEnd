import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';

const StyledControlLabel = styled(FormControlLabel)`
width: fit-content;
`
const StyledTextField = styled(TextField)`
  width: 60%;

  @media (max-width: 900px) {
    width: 100%;
  }
`
const StyledSelect = styled(Select)`
width: 60%;

@media (max-width: 900px) {
  width: 100%;
}
`
const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`
const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  padding: 20px;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`
export { StyledControlLabel, StyledTextField, SelectBox, StyledSelect, StyledForm }
