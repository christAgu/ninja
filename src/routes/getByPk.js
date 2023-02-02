const {Ninja} = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
   app.get('/api/ninjas/:id', (req, res) => {
      Ninja.findByPk(req.params.id)
        .then(data => {
          if (data === null) {
            const message = "Le Ninja  que vous demandé est surement en mission. Reevenez plus tard."
            return res.status(404).json({
               message
             })
           }
          const message = 'Un Ninja a bien été trouvé.'
          res.json({ message, data: data })
        })
    })
  

    
}