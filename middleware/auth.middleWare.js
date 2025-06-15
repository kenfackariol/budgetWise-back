const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant ou invalide' });
  }

  const token = authHeader.split(' ')[1];
  //console.log('JWT_SECRET utilisé pour vérifier:', JWT_SECRET);
  //console.log('Token reçu:', token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    //console.log(' Token décodé:', decoded);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log('Erreur token:', err.message);
    res.status(401).json({ message: 'Token invalide' });
  }
};
