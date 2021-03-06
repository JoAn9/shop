const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Admin = require('../models/Admin');
const config = require('../config');
const authToken = require('../middleware/authToken');

// @route    POST auth/admin
// @desc     Login admin
router.post('/admin', async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ message: 'No login or password' });
  }

  try {
    let admin = await Admin.findOne({ login });

    if (!admin || password !== admin.password) {
      return res.status(400).json({ message: 'No accessss' });
    }

    const payload = {
      admin: {
        id: admin.id,
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
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route    POST auth/user
// @desc     Login user
router.post('/user', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'No email or password' });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'No access' });
    }

    const passwordIsMatch = await bcrypt.compare(password, user.password);

    if (!passwordIsMatch) {
      return res.status(400).json({ message: 'No access' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.jwtSecret,
      // process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 60 * 60 * 24 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route    GET auth/user
// @desc     Load user
router.get('/user', authToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
