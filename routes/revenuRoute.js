const express = require('express');
const router = express.Router();
const revenuCtrl = require('../controllers/revenuControlleur');
const auth = require('../middleware/auth.middleWare'); // Ajout du middleware

// Routes protégées par le token JWT
router.post('/', auth, revenuCtrl.createRevenu);
router.get('/', auth, revenuCtrl.getAllRevenus);
router.put('/:id', auth, revenuCtrl.updateRevenu);
router.delete('/:id', auth, revenuCtrl.deleteRevenu);

module.exports = router;
