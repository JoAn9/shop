import React, { useEffect } from 'react';
import axios from 'axios';

function Landing() {
  const fetchAnswers = async () => {
    const res = await axios.get('/questionnaire');
    console.log(res.data);
  };

  useEffect(() => {
    fetchAnswers();
    return () => {
      // cleanup
    };
  }, []);
  return (
    <div>
      <h1>Questionnaire</h1>
      <h2>What is favourite vegetable?</h2>
    </div>
  );
}

export default Landing;
