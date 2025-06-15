const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
  }
);

// Modèles
const User = require('./user')(sequelize, DataTypes);
const Budget = require('./budget')(sequelize, DataTypes);
const Revenu = require('./revenu')(sequelize, DataTypes);
const Depense = require('./depense')(sequelize, DataTypes);

// Associations
User.hasMany(Budget);
Budget.belongsTo(User);
User.hasMany(Revenu);
Revenu.belongsTo(User);
User.hasMany(Depense);
Depense.belongsTo(User);

module.exports = {
  sequelize,
  User,
  Budget,
  Revenu,
  Depense
};
