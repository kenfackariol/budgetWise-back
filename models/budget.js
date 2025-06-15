module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Budget', {
    mois: {
      type: DataTypes.STRING,
      allowNull: false
    },
    montant: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
     
  });
};
