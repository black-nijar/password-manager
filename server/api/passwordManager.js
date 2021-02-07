const express = require('express');
const router = express.Router();
const db = require('../dbConfig');
const auth = require('../middleware/auth');
const { encrypt } = require('../utils/EncryptionHandler');

// ADD PWD DATA
router.post('/api/addpassword', async (req, res) => {
  let passwordData = req.body;
  passwordData.userId = req.user;
  try {
    const hashedPassword = encrypt(passwordData.password);
    const { password, iv } = hashedPassword;

    passwordData.password = password;
    passwordData.iv = iv;

    await db.query('REPLACE INTO  passwordData SET ?', [passwordData]);

    return res.status(200).json({
      msg: 'Added Password successfully',
    });
  } catch (error) {
    throw error;
  }
});

// GET DATA
router.get('/api/getpassworddetail', async (req, res) => {
  const [detail] = await db.query(`select * from where userId=?`, [req.userId]);
  res.status(200)
});

module.exports = router;
