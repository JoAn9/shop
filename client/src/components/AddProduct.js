import React, { useState, Fragment } from 'react';
import axios from 'axios';

function AddProduct(props) {
  const [productData, setProductData] = useState({
    title: '',
    description: '',
  });
  const { title, description } = productData;

  const [errors, setErrors] = useState([]);
  const [info, setInfo] = useState('');

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
      <form onSubmit={e => onSubmit(e)}>
        <p>
          <input
            type="text"
            placeholder="title"
            name="title"
            value={title}
            onChange={e => handleProductData(e)}
          />
        </p>
        <p>
          <textarea
            placeholder="description"
            name="description"
            value={description}
            onChange={e => handleProductData(e)}
          />
        </p>
        <p>
          <input type="submit" value="Add Product" />
        </p>
      </form>
      {<p>{info}</p>}
      {errors.map(item => (
        <p key={item.path}>{item.message}</p>
      ))}
    </Fragment>
  );
}

export default AddProduct;
