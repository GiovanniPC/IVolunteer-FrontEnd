import styled from 'styled-components'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { MenuColors } from '../../theme/colorsTheme';
const StyledDiv = styled.div`
    flex-grow: 1;
`

const StyledIcon = styled(IconButton)`
    margin-left: -12;
    margin-right: 20;
`
const StyledBar = styled(AppBar)`
    position: static;
`
const StyledToolbar = styled(Toolbar)`
  background: ${MenuColors()};
`
const StyledTypography = styled(Typography)`

    color: inherit;
    flex-grow: 1;

`
export { StyledDiv, StyledBar, StyledToolbar, StyledTypography, StyledIcon }
