module.exports = (sequelize, DataTypes) => {
    return sequelize.define('zion trust', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        notEmpty: { msg: 'Le nom ne peut pas être vide.' },
        notNull: { msg: 'Le nom est une propriété requise.'},
        
      },
     /* unique: {
        msg: 'Le nom est déjà pris.'
      },*/
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
         min: {
          args: [0],
          msg: 'Les points de vie doivent être supérieurs ou égales à 0.'
        },
        max: {
          args: [999],
          msg: 'Les points de vie doivent être inférieurs ou égales à 999.'
        },
       
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
         validate: {
          isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de vie.' },
          notNull: { msg: 'Les points de vie sont une propriété requise.'},
           min: {
          args: [0],
          msg: 'Les points de vie doivent être supérieurs ou égales à 0.'
        },
        max: {
          args: [999],
          msg: 'Les points de vie doivent être inférieurs ou égales à 999.'
        },
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        isUrl: { msg: 'Utilisez uniquement une URL valide pour l\'image.' },
        notNull: { msg: 'L\'image est une propriété requise.'}
      }
      }
      
     
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false,
      
      
    })

    
  }


  