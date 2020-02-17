const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const config = require('../config');

const adLogin = 'admin';
const adPassword = '123';
const adToken = 'hahaha';

// @route    POST auth/admin
// @desc     Login admin
router.post('/admin', (req, res) => {
  const { login, password } = req.body;
  if (login === adLogin && password === adPassword) {
    res.json({ token: adToken });
  } else {
    res.status(401).json({ msg: 'Token not valid' });
  }
});

// @route    POST auth/user
// @desc     Login user
router.post('/user', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ errors: [{ msg: 'No email or password' }] });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'No access' }] });
    }

    const passwordIsMatch = await bcrypt.compare(password, user.password);

    if (!passwordIsMatch) {
      return res.status(400).json({ errors: [{ msg: 'No access' }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.jwtSecret,
      { expiresIn: 60 * 60 * 24 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET auth/user
// @desc     Load user
router.get('/user', (req, res) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ msg: 'Access denied' });
  }

  try {
    jwt.verify(token, config.jwtSecret, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: 'Access denied' });
      }
      const user = await User.findById(decoded.user.id).select('-password');
      res.json(user);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
