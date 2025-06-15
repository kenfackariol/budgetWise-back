require('dotenv').config();
const express = require('express');
const app = express();
const { sequelize } = require('./models'); 

const authRoutes = require('./routes/authRoute');
const authMiddleware = require('./middleware/auth.middleWare');

app.use(express.json());

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:4200', // autorise Angular
  credentials: true // si tu veux autoriser les cookies/JWT en mode sécurisé
}));



app.get('/', (req, res) => res.json({ message: 'BudgetWise API 🧮' }));


app.use('/api/auth', authRoutes);
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Route protégée accessible', userId: req.userId });
});
app.use('/api/depenses', require('./routes/depenseRoute'));
app.use('/api/budgets', require('./routes/budgetRoute'));
app.use('/api/revenus', require('./routes/revenuRoute'));

// Synchronisation et lancement du serveur
sequelize.sync({ alter: true }).then(() => {
  console.log('Base de données synchronisée');
  app.listen(3000, () => {
    console.log('Serveur lancé sur http://localhost:3000 et tables créés');
  });
}).catch(err => console.error('Erreur de synchronisation Sequelize :', err));