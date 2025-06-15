module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Revenu', {
    source: {
      type: DataTypes.STRING,
      allowNull: false
    },
    montant: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  });
};
