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
      backgroundColor: 'var(--primary-color)',
      marginTop: theme.spacing(5),
    },
  },
}));

export const useStylesProducts = makeStyles(theme => {
  const buttons = {
    margin: `${theme.spacing(2)}px 0`,
    height: theme.spacing(5),
  };
  return {
    button: {
      ...buttons,
      backgroundColor: 'var(--primary-color)',
    },
    paper: {
      ...buttons,
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      // width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    table: {
      maxWidth: 800,
    },
  };
});

export const useStylesProductItem = makeStyles(theme => ({
  root: {
    maxWidth: 600,
    width: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export const useStylesQuestionnaire = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
    '& button': {
      backgroundColor: 'var(--primary-color)',
      marginTop: theme.spacing(5),
    },
  },
}));
