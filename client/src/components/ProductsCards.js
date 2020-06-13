import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cardWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

function ProductsCards({
  addProductToCart,
  deleteProduct,
  products: { products },
  adminIsAuthenticated,
}) {
  const classes = useStyles();

  const deleteItem = id => deleteProduct(id);

  return (
    <Grid container spacing={4}>
      {products.map(item => {
        const { _id, title, description, productImg, price } = item;

        const handleAddProduct = () => {
          addProductToCart({ _id, title, productImg, quantity: 1, price });
        };

        const imgPath = buildImageUrl(productImg);

        return (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            className={classes.cardWrapper}
            key={_id}
          >
            <Card className={classes.card}>
              <Link to={`/products/${_id}`}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    className={classes.media}
                    image={imgPath}
                    title={title}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      color="textPrimary"
                    >
                      {title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      noWrap
                    >
                      {description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
              <CardActions className={classes.cardActions}>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  component="span"
                >
                  {price.toFixed(2)} PLN
                </Typography>
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
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

const mapStateToProps = state => ({
  products: state.products,
  adminIsAuthenticated: state.auth.adminIsAuthenticated,
});

export default connect(mapStateToProps, {
  addProductToCart,
  deleteProduct,
})(ProductsCards);
