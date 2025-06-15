const express = require('express');
const router = express.Router();
const depenseCtrl = require('../controllers/depenseControlleur');
const auth = require('../middleware/auth.middleWare'); // <- middleware d'authentification

// Routes protégées par token
router.post('/', auth, depenseCtrl.createDepense);
router.get('/', auth, depenseCtrl.getAllDepenses);
router.put('/:id', auth, depenseCtrl.updateDepense);
router.delete('/:id', auth, depenseCtrl.deleteDepense);

module.exports = router;

