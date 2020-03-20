import { makeStyles } from '@material-ui/core/styles';

export const useStylesLogin = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      [theme.breakpoints.only('xs')]: {
        width: 200,
      },
      [theme.breakpoints.up('sm')]: {
        width: 400,
      },
    },
    '& button': {
      backgroundColor: theme.palette.primary.main,
      marginTop: theme.spacing(5),
    },
  },
}));
