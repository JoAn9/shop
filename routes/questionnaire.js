const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');

// @route    GET /questionnaire
// @desc     get questionnaire
// @access   Public
router.get('/', async (req, res) => {
  try {
    const answers = await Answer.find();
    res.json(answers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST /questionnaire
// @desc     post questionnaire
// @access   Public
router.post('/', async (req, res) => {
  const id = req.body.value;
  try {
    const newAnswer = await Answer.findOne({ _id: id }, (err, data) => {
      if (err) return console.error(err);
      data.votes++;
      data.save(err => {
        if (err) return console.error(err);
      });
    });
    res.json(newAnswer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
