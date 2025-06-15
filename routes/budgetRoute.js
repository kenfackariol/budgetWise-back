const express = require('express');
const router = express.Router();
const budgetCtrl = require('../controllers/budgetControlleur');
const auth = require('../middleware/auth.middleWare');

router.post('/createUpdate', auth,budgetCtrl.createOrUpdateBudget);
router.get('/', auth, budgetCtrl.getAllBudgets);
router.get('/:mois',auth, budgetCtrl.getBudgetByMonth);


module.exports = router;