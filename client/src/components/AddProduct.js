import React, { useState, Fragment } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(1),
    },
    '& button': {
      marginTop: theme.spacing(5),
      width: 200,
    },
  },
  title: {
    width: 200,
  },
  description: {
    [theme.breakpoints.only('xs')]: {
      width: 200,
    },
    [theme.breakpoints.up('sm')]: {
      width: 500,
    },
  },
}));

function AddProduct(props) {
  const [productData, setProductData] = useState({
    title: '',
    description: '',
  });
  const { title, description } = productData;

  const [errors, setErrors] = useState([]);
  const [info, setInfo] = useState('');
  const classes = useStyles();

  const handleProductData = e => {
    setErrors([]);
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ title, description });
    try {
      const res = await axios.post('/admin/products', body, config);
      if (res) setInfo('Product added');
      setProductData({ title: '', description: '' });
      props.history.push('/products');
    } catch (err) {
      console.log(err.response);
      const {
        data: { errors },
      } = err.response;
      setErrors(Object.values(errors));
      setInfo('');
    }
  };

  return (
    <Fragment>
      <form className={classes.root} onSubmit={e => onSubmit(e)}>
        <TextField
          id="title"
          name="title"
          label="Title"
          value={title}
          onChange={handleProductData}
          className={classes.title}
        />
        <TextField
          id="description"
          name="description"
          label="Description"
          multiline
          rows="4"
          rowsMax="10"
          value={description}
          onChange={handleProductData}
          className={classes.description}
        />
        <Button variant="contained" color="primary" type="submit">
          Add Product
        </Button>
      </form>
      {<p>{info}</p>}
      {errors.map(item => (
        <p key={item.path}>{item.message}</p>
      ))}
    </Fragment>
  );
}

export default AddProduct;
