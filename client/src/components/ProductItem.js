import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import ShareIcon from '@material-ui/icons/Share';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { fetchProductById } from '../actions/products';
import { addProductToCart } from '../actions/cart';
import buildImageUrl from '../utils/buildImageUrl';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 600,
    width: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'contain',
  },
  quantity: {
    width: 70,
    marginLeft: theme.spacing(3),
  },
  buying: {
    marginTop: theme.spacing(3),
  },
}));

function ProductItem({ addProductToCart, fetchProductById, match, product }) {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);

  const id = match.params.id;

  const cancelToken = axios.CancelToken.source();

  useEffect(() => {
    fetchProductById(id, cancelToken.token);
    return () => {
      cancelToken.cancel('Fetching product details canceled.');
    };
  }, [id, fetchProductById]);

  useEffect(() => {
    if (quantity < 1) setQuantity(1);
  }, [quantity]);

  const handleChangeQuantity = event => {
    setQuantity(Number(event.target.value));
  };

  const handleAddProduct = () => {
    addProductToCart({ _id, title, quantity, price, productImg });
  };

  const { title, description, created, productImg, price, _id } = product;
  const imgPath = buildImageUrl(productImg);

  return (
    <Card className={classes.root}>
      <CardHeader title={title} subheader={created} />
      {productImg ? (
        <CardMedia className={classes.media} image={imgPath} title={title} />
      ) : (
        'No image... :('
      )}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
        <Typography variant="h5" color="textSecondary">
          Price: {price} PLN
        </Typography>
        <div className={classes.buying}>
          <IconButton aria-label="buy" onClick={handleAddProduct}>
            <ShoppingCartOutlinedIcon color="primary" fontSize="large" />
          </IconButton>
          <TextField
            id="quantity"
            label="Quantity"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={quantity}
            onChange={handleChangeQuantity}
            className={classes.quantity}
          />
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Rating">
          <IconButton aria-label="rating">
            <StarHalfIcon />
          </IconButton>
        </Tooltip>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = state => ({
  product: state.products.product,
});

export default connect(mapStateToProps, {
  addProductToCart,
  fetchProductById,
})(ProductItem);
