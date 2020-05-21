import React, { Fragment } from 'react';
import { connect } from 'react-redux';
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
import { addQuantity, removeQuantity } from '../actions/basket';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Basket({ basketProducts, addQuantity, removeQuantity }) {
  const classes = useStyles();

  const confirmPurchase = async () => {
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // };
    // const body = JSON.stringify({ productId: id, quantity });
    // try {
    //   const res = await axios.post('/basket', body, config);
    //   console.log(res);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div>
      <h2>Basket</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="basket">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basketProducts.map(item => (
              <TableRow key={item._id}>
                <TableCell component="th" scope="row">
                  {item.title}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="remove"
                    onClick={() => removeQuantity(item)}
                  >
                    <RemoveCircleOutlinedIcon />
                  </IconButton>
                  {item.quantity}
                  <IconButton
                    aria-label="add"
                    onClick={() => addQuantity(item)}
                  >
                    <AddCircleOutlinedIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">{item.price}</TableCell>
                <TableCell align="right">
                  {(item.quantity * item.price).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <button onClick={confirmPurchase}>I am buying</button>
    </div>
  );
}

const mapStateToProps = state => ({
  basketProducts: state.basket.products,
});

export default connect(mapStateToProps, { addQuantity, removeQuantity })(
  Basket
);
