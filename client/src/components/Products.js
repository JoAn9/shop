import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { addProductToBasket } from '../actions/basket';
import {
  fetchProducts,
  deleteProduct,
  searchProducts,
} from '../actions/products';

const useStyles = makeStyles(theme => {
  const buttons = {
    margin: `${theme.spacing(2)}px 0`,
    height: theme.spacing(5),
  };
  return {
    button: {
      ...buttons,
      backgroundColor: theme.palette.primary.main,
    },
    deleteBtn: {
      backgroundColor: theme.palette.danger.main,
      color: theme.palette.danger.contrastText,
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
      maxWidth: 1100,
    },
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    wrapText: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '300px',
    },
  };
});

function Products({
  addProductToBasket,
  fetchProducts,
  deleteProduct,
  searchProducts,
  products: { products },
  adminIsAuthenticated,
}) {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [quantity, setQuantity] = useState(1);

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

  const deleteItem = id => deleteProduct(id);

  const handleSubmitSearch = async e => {
    e.preventDefault();
    searchProducts(search);
  };

  // @todo make table responsive
  return (
    <div>
      <div className={classes.buttonsContainer}>
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
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length > 0 &&
              products.map(row => {
                const { _id, title, description, productImg, price } = row;

                const handleAddProduct = () => {
                  addProductToBasket({ _id, title, quantity, price });
                };

                const path = productImg
                  ?.split('/')
                  .slice(-2)
                  .join('/');
                const imgPath = `http://localhost:3000/${path}`;

                return (
                  <TableRow key={_id}>
                    <TableCell component="th" scope="row">
                      <Link to={`/products/${_id}`}>
                        <img src={imgPath} height="60px" alt={title} />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link to={`/products/${_id}`}>{title}</Link>
                    </TableCell>
                    <TableCell>
                      <p className={classes.wrapText}>{description}</p>
                    </TableCell>
                    <TableCell align="right">{price}</TableCell>
                    <TableCell align="right">
                      {adminIsAuthenticated ? (
                        <Button
                          variant="contained"
                          className={classes.deleteBtn}
                          onClick={() => deleteItem(_id)}
                        >
                          Delete
                        </Button>
                      ) : (
                        <IconButton aria-label="buy" onClick={handleAddProduct}>
                          <ShoppingCartOutlinedIcon
                            color="primary"
                            fontSize="large"
                          />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const mapStateToProps = state => ({
  products: state.products,
  adminIsAuthenticated: state.auth.adminIsAuthenticated,
});

export default connect(mapStateToProps, {
  addProductToBasket,
  fetchProducts,
  deleteProduct,
  searchProducts,
})(Products);
