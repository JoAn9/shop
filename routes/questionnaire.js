const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');

// @route    GET /questionnaire
// @desc     get questionnaire
// @access   Public
router.get('/', async (req, res) => {
  try {
    const answers = await Answer.find();
    console.log(answers);
    res.json(answers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
