import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2bb3e9',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ef5350',
      contrastText: '#fff',
    },
  },
  spacing: 8,
});

export default theme;
