import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addProductToDb } from '../actions/products';

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

function AddProduct({ addProductToDb }) {
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
  });
  const { title, description, price } = productData;
  const [selectedFile, setSelectedFile] = useState([]);
  const classes = useStyles();

  const handleProductData = e => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    addProductToDb(productData, selectedFile);
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
    </div>
  );
}

export default connect(null, { addProductToDb })(AddProduct);
