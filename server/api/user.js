const express = require('express');
const router = express.Router();
const db = require('../dbConfig');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { token } = require('morgan');
const SALT = 8;

// REGISTER
router.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = {
      email,
      createdAt: new Date(),
    };
    const [user] = await db.query(
      `select users.email from users where email=?`,
      [email]
    );
    if (user.length) {
      res.status(400).json({ msg: 'User already exist!' });
    } else {
      const hashPassword = await bcrypt.hash(password, SALT);
      newUser.password = hashPassword;
      await db.query('insert into users set ?', newUser);
      res.status(200).json({ msg: 'User registered Successfully!' });
    }
  } catch (error) {
    throw error;
  }
});

// LOGIN
router.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [user] = await db.query(`select * from users where email=?`, [email]);
    if (!user.length) {
      res.status(400).json({ msg: 'User does not exist!' });
    } else {
      const isMatch = await bcrypt.compare(password, user[0].password);
      if (!isMatch) {
        res.status(400).json({ msg: 'Password does not match!' });
      } else {
        console.log('id ', user);
        const payload = {
          user: {
            userId: user[0].idUser,
          },
        };

        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: 360000,
          },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({ msg: 'Login Successfully!', token });
          }
        );
      }
    }
  } catch (error) {
    throw error;
  }
});
module.exports = router;
