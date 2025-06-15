module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Depense', {
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    montant: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    categorie: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
   
    
  });
};
