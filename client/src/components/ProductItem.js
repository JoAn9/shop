import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarsIcon from '@material-ui/icons/Stars';
import ShareIcon from '@material-ui/icons/Share';
import { productsReducer, initialState } from '../store/productsReducer';
import { GET_PRODUCT } from '../store/types';
import { useStylesProductItem as useStyles } from '../styles';

function ProductItem(match) {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  const fetchProductById = async id => {
    const res = await axios.get(`/products/${id}`);
    console.log(res.data);
    dispatch({ type: GET_PRODUCT, payload: res.data });
  };

  const id = match.match.params.id;
  useEffect(() => {
    fetchProductById(id);
    return () => {
      // cleanup;
    };
  }, [id]);

  const {
    product: { title, description, created },
  } = state;

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title={title} subheader={created} />
      <CardMedia
        className={classes.media}
        image={require('../img/natka.jpg')}
        title="leaves"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="rating">
          <StarHalfIcon />
          <StarsIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ProductItem;
