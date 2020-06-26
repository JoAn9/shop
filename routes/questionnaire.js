const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');
const Ip = require('../models/Ip');

// @route    GET /questionnaire
// @desc     get questionnaire
// @access   Public
router.get('/', async (req, res) => {
  const show = !req.cookies.voted;

  try {
    const answers = await Answer.find();
    let votesSum = 0;
    answers.forEach(item => (votesSum += item.votes));
    res.json({ answers, show, votesSum });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route    POST /questionnaire
// @desc     post questionnaire
// @access   Public
router.post('/', async (req, res) => {
  const id = req.body.value;
  const ipNumber = req.ip;
  const cookieTime = 365 * 24 * 60 * 60 * 1000;
  try {
    let ip = await Ip.findOne({ ipNumber });

    if (ip) {
      // req.session.voted = 1;
      res.cookie('voted', 'true', { maxAge: cookieTime });
      return res.status(400).json({ message: 'You have already voted' });
    }

    const newAnswer = await Answer.findOne({ _id: id }, (err, data) => {
      if (err) return res.status(404).json({ message: 'Not found' });
      data.votes++;
      // req.session.voted = 1;
      res.cookie('voted', 'true', { maxAge: cookieTime });
      data.save(err => {
        if (err)
          return res.status(500).json({ message: 'Something went wrong' });
      });
    });
    ip = new Ip({ ipNumber });
    await ip.save();
    res.json(newAnswer);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
