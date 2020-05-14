import React from 'react';
import axios from 'axios';

function Basket() {
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
      Basket
      <button onClick={confirmPurchase}>I am buying</button>
    </div>
  );
}

export default Basket;
