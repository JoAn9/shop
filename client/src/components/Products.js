import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
import productsReducer, { initialState } from '../reducers/productsReducer';
import { DELETE_PRODUCT, GET_PRODUCTS } from '../actions/types';
import { useStylesProducts as useStyles } from '../styles';

function Products() {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const [search, setSearch] = useState('');
  const [state, dispatch] = useReducer(productsReducer, initialState);
  const classes = useStyles();

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/products', {
        cancelToken: source.token,
      });
      dispatch({ type: GET_PRODUCTS, payload: res.data });
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request canceled:', err.message);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
    return () => {
      source.cancel('Fetching products canceled.');
    };
  }, []);

  const deleteItem = async id => {
    await axios.delete(`/admin/products/${id}`);
    dispatch({ type: DELETE_PRODUCT, payload: id });
  };

  const handleSubmitSearch = async e => {
    e.preventDefault();
    const res = await axios.get('/products', { params: { search } });
    dispatch({ type: GET_PRODUCTS, payload: res.data });
    console.log(res);
  };

  const { products } = state;

  return (
    <div>
      <div className="buttons-container">
        <Tooltip title="Add new product">
          <Button
            variant="contained"
            color="primary"
            href="/admin/products"
            className={classes.button}
          >
            <AddIcon /> Add
          </Button>
        </Tooltip>
        <Paper
          component="form"
          className={classes.paper}
          onSubmit={e => handleSubmitSearch(e)}
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
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(row => {
              const { _id, title, description, created } = row;
              return (
                <TableRow key={_id}>
                  <TableCell component="th" scope="row"></TableCell>
                  <TableCell align="right">
                    <Link to={`/products/${_id}`}>{title}</Link>
                  </TableCell>
                  <TableCell align="right">{description}</TableCell>
                  <TableCell align="right">{created}</TableCell>
                  <TableCell align="right">
                    {' '}
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteItem(_id)}
                    >
                      Delete
                    </Button>
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

export default Products;
