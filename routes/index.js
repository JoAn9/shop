const express = require('express');
const router = express.Router();
const adLogin = 'admin';
const adPassword = '123';
const token = 'hahaha';
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

//login admin
router.post('/login', (req, res) => {
  console.log(req.body);

  const { login, password } = req.body;
  if (login === adLogin && password === adPassword) {
    res.json({ token });
  } else {
    res.status(401).json({ msg: 'Token not valid' });
  }
});

module.exports = router;
