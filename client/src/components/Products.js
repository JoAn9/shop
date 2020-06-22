import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ProductsCards from './ProductsCards';
import ProductsTable from './ProductsTable';
import { fetchProducts, searchProducts } from '../actions/products';

const useStyles = makeStyles(theme => {
  const buttons = {
    margin: `${theme.spacing(2)}px 0`,
    height: theme.spacing(5),
  };
  return {
    productsConainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(5),
      flexWrap: 'wrap',
    },
    button: {
      ...buttons,
      backgroundColor: theme.palette.primary.main,
    },
    paper: {
      ...buttons,
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    viewSwitch: {
      justifyContent: 'flex-end',
    },
  };
});

function Products({ fetchProducts, searchProducts, products: { products } }) {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [cardsView, setCardsView] = useState(true);

  const cancelToken = axios.CancelToken.source();

  const handleChange = e => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    fetchProducts(cancelToken.token);
    return () => {
      cancelToken.cancel('Fetching products canceled.');
    };
  }, [fetchProducts]);

  const handleSubmitSearch = e => {
    e.preventDefault();
    searchProducts(search);
  };

  const handleChangeSwitchView = () => {
    setCardsView(!cardsView);
  };

  const searchView = (
    <div container="true" className={classes.buttonsContainer}>
      <Tooltip title="Add new product">
        <Link to="/admin/products">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            <AddIcon /> Add
          </Button>
        </Link>
      </Tooltip>
      <Paper
        component="form"
        className={classes.paper}
        onSubmit={handleSubmitSearch}
      >
        <InputBase
          className={classes.input}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search product' }}
          name="search"
          value={search}
          onChange={handleChange}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );

  const switchView = (
    <FormGroup row className={classes.viewSwitch}>
      <FormControlLabel
        control={
          <Switch
            checked={cardsView}
            onChange={handleChangeSwitchView}
            name="view"
          />
        }
        label="Cards View"
      />
    </FormGroup>
  );

  return (
    <div className={classes.productsConainer}>
      {switchView}
      {searchView}
      {products.length > 0 && cardsView && <ProductsCards />}
      {products.length > 0 && !cardsView && <ProductsTable />}
    </div>
  );
}

const mapStateToProps = state => ({
  products: state.products,
});

export default connect(mapStateToProps, {
  fetchProducts,
  searchProducts,
})(Products);
