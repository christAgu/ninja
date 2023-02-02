const { Ninja} = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth')

 
module.exports = (app) => {
  app.post('/api/ninjas', auth, (req, res) => {
    Ninja.create(req.body)
      .then(data => {
        const message = `Bienvenue dans le temple des ninjas  ${req.body.name} , ici se decide ton destin!`
       
        res.json({ message, data: data })
      }) .catch(error => {

        //definir des message en cas d'erreur de validation
        if(error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if(error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: 'error.message', data: error });
        }
        const message = `Le temple n'accepte que ninja avec des Shakra pure. Réesseyer`
        res.status(500).json({ message, data: error })
      })
  })
}