const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth.middleWare');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/user', auth, authController.getCurrentUser);
router.put('/updateMe', auth, authController.updateMe);
module.exports = router;
