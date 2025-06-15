const {Budget} = require('../models');

exports.createOrUpdateBudget = async (req, res) => {
  try {
    const { mois, montant } = req.body;
    const UserId = req.userId;

    console.log('➡️ Création budget avec :', { mois, montant, UserId });

    let budget = await Budget.findOne({ where: { mois, UserId } });

    if (budget) {
      await budget.update({ montant });
    } else {
      budget = await Budget.create({ mois, montant, UserId });
      console.log('User ID reçu dans le contrôleur:', UserId);

    }

    res.json(budget);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllBudgets = async (req, res) => {
  try {
    const UserId = req.userId;

    const budgets = await Budget.findAll({ where: { UserId } });

    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getBudgetByMonth = async (req, res) => {
  try {
    const { mois } = req.params;
    const UserId = req.userId;
    console.log(UserId, mois)
    const budget = await Budget.findOne({ where: { mois, UserId } });

    if (!budget) return res.status(404).json({ error: 'Budget non trouvé' });

    res.json(budget);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
