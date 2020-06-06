import React from 'react';
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
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutlinedIcon from '@material-ui/icons/RemoveCircleOutlined';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import { addQuantity, removeQuantity } from '../actions/cart';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Cart({ cartProducts, addQuantity, removeQuantity }) {
  const classes = useStyles();

  const confirmPurchase = async () => {
    console.log('buying');
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="cart">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Product</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartProducts.map(item => {
              const { _id, title, price, quantity, productImg } = item;
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
                  <TableCell component="th" scope="row">
                    {title}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="remove"
                      onClick={() => removeQuantity(item)}
                    >
                      <RemoveCircleOutlinedIcon />
                    </IconButton>
                    {quantity}
                    <IconButton
                      aria-label="add"
                      onClick={() => addQuantity(item)}
                    >
                      <AddCircleOutlinedIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">{price}</TableCell>
                  <TableCell align="right">
                    {(quantity * price).toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <button onClick={confirmPurchase}>I am buying</button>
    </div>
  );
}

const mapStateToProps = state => ({
  cartProducts: state.cart.products,
});

export default connect(mapStateToProps, { addQuantity, removeQuantity })(Cart);
