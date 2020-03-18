import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
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
import productsReducer, { initialState } from '../reducers/productsReducer';
import { GET_PRODUCT } from '../actions/types';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 600,
    width: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

function ProductItem(match) {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const [state, dispatch] = useReducer(productsReducer, initialState);
  const classes = useStyles();

  const fetchProductById = async id => {
    try {
      const res = await axios.get(`/products/${id}`, {
        cancelToken: source.token,
      });
      dispatch({ type: GET_PRODUCT, payload: res.data });
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request canceled:', err.message);
      }
    }
  };

  const id = match.match.params.id;
  useEffect(() => {
    fetchProductById(id);
    return () => {
      source.cancel('Fetching product details canceled.');
    };
  }, [id]);

  const {
    product: { title, description, created, img },
  } = state;

  const bufferImg = img?.data;
  const contentTypeImg = img?.contentType;

  let b64;
  let mimeType;
  if (bufferImg) {
    b64 = new Buffer(bufferImg).toString('base64');
    mimeType = contentTypeImg;
  }

  return (
    <Card className={classes.root}>
      <CardHeader title={title} subheader={created} />
      {img ? (
        <CardMedia
          className={classes.media}
          image={`data:${mimeType};base64,${b64}`}
          title={title}
        />
      ) : (
        'No image... :('
      )}

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
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

export default ProductItem;
