const ninja = require('../../model/ninja');
const {
  Ninja
} = require('../db/sequelize')

const auth = require('../auth/auth')

module.exports = (app) => {
  app.delete('/api/ninjas/:id', auth, (req, res) => {
    Ninja.findByPk(req.params.id).then(data => {
      const NinjaDeleted = data;
      const Ninjaid = req.params.id
      Ninja.destroy({
          where: {
            id: Ninjaid
          }
        })
        .then(_ => {
          if (data === null) {
            const message = `Le Ninja que vous demandé n'existe pas dans notre temple. Réessayez .`
            return res.status(404).json({
              message
            })
          }

          const message = `Vous avez combatu avec  honneur ${NinjaDeleted.name} 🔥...Que le Valhalla  vous acceuil`
          res.json({
            message,
            data: NinjaDeleted
          })
        })

    }).catch(error => {
      const message = `Vous avez un destin téméraire grand Ninja, ça ne sera pas aujourd'hui.`
      res.status(500).json({
        message,
        data: error
      })
    })
  })
}