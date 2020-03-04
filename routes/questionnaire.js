const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');
const Ip = require('../models/Ip');

// @route    GET /questionnaire
// @desc     get questionnaire
// @access   Public
router.get('/', async (req, res) => {
  const show = !req.session.voted;

  try {
    const answers = await Answer.find();
    let votesSum = 0;
    answers.forEach(item => (votesSum += item.votes));
    res.json({ answers, show, votesSum });
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
  const ipNumber = req.ip;

  try {
    let ip = await Ip.findOne({ ipNumber });

    if (ip) {
      req.session.voted = 1;
      return res.status(400).json({ msg: 'You have already voted' });
    }

    const newAnswer = await Answer.findOne({ _id: id }, (err, data) => {
      if (err) return res.status(404).send({ msg: 'Not found' });
      data.votes++;
      req.session.voted = 1;
      data.save(err => {
        if (err) return res.status(500).send({ msg: 'Something went wrong' });
      });
    });
    ip = new Ip({ ipNumber });
    await ip.save();
    res.json(newAnswer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
