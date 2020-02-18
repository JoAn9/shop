import React, { useEffect, useReducer, useContext } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { productsReducer, initialState } from '../store/productsReducer';
import { DELETE_PRODUCT, GET_PRODUCTS } from '../store/types';
import { AuthContext } from '../App';
import { useStylesProducts as useStyles } from '../styles';

// todo: try catch

function Products() {
  const { state: authState } = useContext(AuthContext);
  const [state, dispatch] = useReducer(productsReducer, initialState);

  const classes = useStyles();

  const fetchProducts = async () => {
    const res = await axios.get('/products');
    console.log(res.data);
    dispatch({ type: GET_PRODUCTS, payload: res.data });
  };

  useEffect(() => {
    fetchProducts();
    return () => {
      // @todo: cleanup;
    };
  }, []);

  const deleteItem = async id => {
    await axios.delete(`/admin/products/${id}`);
    dispatch({ type: DELETE_PRODUCT, payload: id });
  };

  const handleSubmit = async e => {
    // e.preventDefault();
    const res = await axios.get('/products');
    console.log(res);
  };

  const { products } = state;

  return (
    <div>
      <div className="buttons-container">
        <Button
          variant="contained"
          color="primary"
          href="/admin/products"
          className={classes.button}
        >
          + Add
        </Button>
        <Paper
          component="form"
          className={classes.paper}
          onSubmit={e => handleSubmit(e)}
        >
          <InputBase
            className={classes.input}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search product' }}
            name="search"
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
            {products.map(row => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row"></TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.created}</TableCell>
                <TableCell align="right">
                  {' '}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteItem(row._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Products;
