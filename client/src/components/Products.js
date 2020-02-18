import React, { Fragment, useEffect, useReducer, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { productsReducer, initialState } from '../store/productsReducer';
import { DELETE_PRODUCT, GET_PRODUCTS } from '../store/types';
import { AuthContext } from '../App';

const useStyles = makeStyles(theme => ({
  button: {
    margin: `${theme.spacing(2)}px 0`,
  },
  table: {
    minWidth: 450,
  },
}));

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

  const { products } = state;

  console.log(authState);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        href="/admin/products"
        className={classes.button}
      >
        Add product
      </Button>
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
