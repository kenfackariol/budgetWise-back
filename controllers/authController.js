const { User } = require('../models'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

exports.register = async (req, res) => {
  const { nom, prenom, email, password } = req.body;

  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: 'Email déjà utilisé' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ nom, prenom, email, password: hashed });

    res.status(201).json({
      message: 'Utilisateur créé',
      user: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const id = req.userId; // injecté par le middleware auth
    const user = await User.findByPk(id, {
      attributes: ['id', 'nom', 'prenom', 'email'] // on évite de renvoyer le password
    });

    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMe = async (req, res) => {
  const userId = req.userId;
  const { nom, prenom, email, password } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    user.nom = nom || user.nom;
    user.prenom = prenom || user.prenom
    user.email = email || user.email

    if (password && password.length >= 6) {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
    }

    await user.save();

    res.json({ message: 'Profil mis à jour avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Email ou mot de passe invalide' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Email ou mot de passe invalide' });

    const userPlain = user.get({ plain: true }); 

    const token = jwt.sign({ userId: userPlain.id }, JWT_SECRET, { expiresIn: '1d' });
    //console.log(' Token généré :', token);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
