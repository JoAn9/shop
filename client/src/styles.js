import { makeStyles } from '@material-ui/core/styles';

export const useStylesLogin = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 400,
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
    },
    '& button': {
      backgroundColor: theme.palette.primary.main,
      marginTop: theme.spacing(5),
    },
  },
}));
