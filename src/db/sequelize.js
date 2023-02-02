const { Sequelize, DataTypes} = require('sequelize')
const NinjaModel = require('../../model/ninja')
//on importe le modèle User que nous avons implémenter précédemment.
const UserModel = require('../../model/user')
const bcrypt = require('bcrypt')
const ninjas = require('./data')
require('dotenv').config()

if(process.env.NODE_ENV === 'production') {
  // Saisissez également vos nouveaux identifiants pour la production :
  sequelize = new Sequelize('process.env.MYSQL_ADDON_DB', 'process.env.MYSQL_ADDON_USER', 'process.env.MYSQL_ADDON_PASSWORD', {
    host: 'process.env.MYSQL_ADDON_HOST',
    dialect: 'mariadb',
    port:'process.env.MYSQL_ADDON_PORT',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: true
  })
} else {
  sequelize = new Sequelize('Ninjadex', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',

    },
    logging: true
  })
   
}
 

//on instancie le modèle User auprès de Sequelize, comme on avait fait pour le modèle des pokémons.
const Ninja = NinjaModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)


// 3/3. On teste si la connexion a réussie ou non :
sequelize.authenticate()
  .then(_ => console.log('Connection has been established successfully.'))
  .catch(error => console.error('Unable to connect to the database:', error))



// On initialise la base de données "Ninjadex" avec 12 Ninja.


const initDb = () => {
  return sequelize.sync().then(_ => {
    ninjas.map(ninja => {
      Ninja.create({
        name: ninja.name,
        hp: ninja.hp,
        cp: ninja.cp,
        picture: ninja.picture,


      }).then(ninja => console.log(ninja.toJSON()))

      

// on pousse un nouvel utilisateur dans notre base de données MySQL, grâce à la méthode create.
bcrypt.hash('Chioki6' , 10)
.then(hash => User.create({ username: 'Chioki', password: hash })).then(user => console.log(user.toJSON()))
    })
    
    console.log('La base de donnée a bien été initialisée !')
})


 
}

module.exports = {
  initDb,
  //export de  notre modèle User à la ligne, afin de pouvoir l’utiliser ailleurs dans notre API Rest.
  Ninja,User
}