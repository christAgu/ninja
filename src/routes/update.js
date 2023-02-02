const { Ninja} = require('../db/sequelize')
const auth = require('../auth/auth')


module.exports = (app) => {
    app.put('/api/ninjas/:id',auth, (req, res) => {
      const id = req.params.id
      Ninja.update(req.body, {
        where: { id: id }
      })
      .then(_ => {
        Ninja.findByPk(id).then(data => {
            if(data === null) {
                const message = "Le Ninja demandé n'existe pas dans notre temple."
                return res.status(404).json({ message })
              }
          const message = `Les ninjutsu du Ninja ${data.name} ont bien été mise a jours.`
          res.json({message, data: data })
        }).catch(error => {
            const message = `Les ninjutsu du Ninja ${data.name} n'ont pas pu etre modifié.`
            res.status(500).json({ message, data: error })
          })
        })
      })

  }