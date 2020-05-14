import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
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
  field: {
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
    price: '',
  });
  const { title, description, price } = productData;
  const [selectedFile, setSelectedFile] = useState([]);
  const [errors, setErrors] = useState([]);
  const [info, setInfo] = useState('');
  const classes = useStyles();

  const handleProductData = e => {
    setErrors([]);
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    const body = new FormData();
    body.append('productImg', selectedFile);
    body.append('title', title);
    body.append('description', description);
    body.append('price', price);

    const contentType = {
      headers: { 'content-type': 'multipart/form-data' },
    };

    try {
      const res = await axios.post('/admin/products', body, contentType);
      if (res) setInfo('Product added');
      setProductData({ title: '', description: '', price: '' });
      props.history.push('/products');
    } catch (err) {
      const {
        data: { errors },
      } = err.response;
      errors && setErrors(Object.values(errors));
      setInfo('');
    }
  };

  const handleFile = e => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className={classes.container}>
      <form className={classes.root} onSubmit={onSubmit}>
        <TextField
          id="title"
          name="title"
          label="Title"
          value={title}
          onChange={handleProductData}
          className={classes.field}
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
        <TextField
          id="price"
          name="price"
          label="Price"
          type="number"
          value={price}
          onChange={handleProductData}
          className={classes.field}
        />
        <label>Select an image to upload:</label>
        <input type="file" name="productImg" onChange={handleFile} />
        <Button variant="contained" color="primary" type="submit">
          Add Product
        </Button>
      </form>
      {<p>{info}</p>}
      {errors.map(item => (
        <p key={item.path}>{item.message}</p>
      ))}
    </div>
  );
}
// @todo snackbar with errors

export default AddProduct;
