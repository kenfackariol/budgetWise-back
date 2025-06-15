const { Depense } = require('../models');

// Créer une dépense liée à l'utilisateur
exports.createDepense = async (req, res) => {
  try {
    const { nom, montant, categorie, date } = req.body;
    const UserId = req.userId;
    console.log(UserId)

    const depense = await Depense.create({ nom, montant, categorie, date, UserId });
    res.status(201).json(depense);
    console.log(depense)
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtenir toutes les dépenses de l'utilisateur
exports.getAllDepenses = async (req, res) => {
  try {
    const userId = req.userId;  

    if (!userId) {
      return res.status(401).json({ error: 'Utilisateur non authentifié' });
    }

    const depenses = await Depense.findAll({ where: { userId } });
    res.json(depenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Modifier une dépense (si elle appartient à l'utilisateur)
exports.updateDepense = async (req, res) => {
  try {
    const UserId = req.userId;  
    const { id } = req.params;
    const { nom, description, montant } = req.body;

    const depense = await Depense.findOne({ where: { id, UserId } });

    if (!depense) return res.status(404).json({ error: 'Dépense non trouvée' });

    await depense.update({ nom, description, montant });
    res.json(depense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer une dépense (si elle appartient à l'utilisateur)
exports.deleteDepense = async (req, res) => {
  try {
    const UserId = req.userId;  
    const { id } = req.params;

    const depense = await Depense.findOne({ where: { id, UserId } });

    if (!depense) return res.status(404).json({ error: 'Dépense non trouvée' });

    await depense.destroy();
    res.json({ message: 'Dépense supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
