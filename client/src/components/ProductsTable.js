import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { addProductToCart } from '../actions/cart';
import { deleteProduct } from '../actions/products';
import buildImageUrl from '../utils/buildImageUrl';

const useStyles = makeStyles(theme => ({
  deleteBtn: {
    backgroundColor: theme.palette.danger.main,
    color: theme.palette.danger.contrastText,
  },
  table: {
    maxWidth: 1100,
  },
  wrapText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '300px',
  },
}));

function Products({
  addProductToCart,
  deleteProduct,
  products: { products },
  adminIsAuthenticated,
}) {
  const classes = useStyles();

  const deleteItem = id => deleteProduct(id);

  return (
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
          {products.map(row => {
            const { _id, title, description, productImg, price } = row;

            const handleAddProduct = () => {
              addProductToCart({
                _id,
                title,
                productImg,
                quantity: 1,
                price,
              });
            };
            const imgPath = buildImageUrl(productImg);

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
  );
}

const mapStateToProps = state => ({
  products: state.products,
  adminIsAuthenticated: state.auth.adminIsAuthenticated,
});

export default connect(mapStateToProps, {
  addProductToCart,
  deleteProduct,
})(Products);
