const { Revenu }= require('../models');

exports.createRevenu = async (req, res) => {
  try {
    const { montant, source, date } = req.body;
    const UserId = req.userId;

    const revenu = await Revenu.create({ montant, source, date, UserId });
    res.status(201).json(revenu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllRevenus = async (req, res) => {
  try {
    const userId = req.userId;
    const revenus = await Revenu.findAll({ where: { userId } });
    res.json(revenus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRevenu = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { montant, source, date } = req.body;

    const revenu = await Revenu.findOne({ where: { id, userId } });
    if (!revenu) return res.status(404).json({ error: 'Revenu non trouvé' });

    await revenu.update({ montant, source, date });
    res.json(revenu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteRevenu = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const revenu = await Revenu.findOne({ where: { id, userId } });
    if (!revenu) return res.status(404).json({ error: 'Revenu non trouvé' });

    await revenu.destroy();
    res.json({ message: 'Revenu supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
