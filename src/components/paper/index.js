import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'

const Papers = styled(Paper)`
    margin: ${props => props.margin};
    padding: ${props => props.padding};
`

Papers.defaultProps = {
    margin: "90px 20px",
    padding: "30px 20px"
  }

export default Papers