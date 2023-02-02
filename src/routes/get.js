const {
    Ninja
} = require('../db/sequelize')
const {
    Op
} = require('sequelize')
const auth = require('../auth/auth')
// Méthode "maison", qui permet de mettre la première lettre d'une string en majuscule
const capitalize = str => str.charAt(0).toUpperCase() + str.substring(1)


module.exports = (app) => {
    app.get('/api/ninjas', (req, res) => {

        if (req.query.name  ) {
            const name = req.query.name
            const limit = parseInt(req.query.limit) || 5

            if(name.length < 2) {
                const message = `Le terme de recherche doit contenir au minimum 2 caractères.`
                return res.status(400).json({ message })        
              }
              
            return Ninja.findAndCountAll({ 
                where: { 
                  name: {
                    [Op.or]: {
                      [Op.like]: `%${name}%`,
                      [Op.startsWith]:capitalize (name)
                    }
                  }
                },order: ['name'],
                limit: limit
              })
                .then(({count, rows}) => {
                    const message = `Il y a ${count} Ninja (🥷) qui correspondent au terme de recherche ${name}.`
                    return res.json({
                        message,
                        data: rows
                    })
                })
        } else if(req.query.limit){
           //
            const limit = parseInt(req.query.limit)
            Ninja.findAll({ order: ['name'] , limit: limit}).then(data => {
               

                const messages = `${data.length}🥷 ninjas ont invoqué selon votre demande `
                res.json({messages, data: data
                })
            }).catch(error => {
                const message = `Impossible d'indentifier les Ninjas du Temple 
                             réessayez dans quelques instants.`
                res.status(500).json({
                    message,
                    data: error
                })
            })
        }  else
        
        Ninja.findAll({ order: ['name'] }).then(data => {
               

            const messages = `${data.length} 🥷 ninjas `
            res.json({messages, data: data
            })
        }).catch(error => {
            const message = `Impossible d'indentifier les Ninja du Temple Réessayez dans quelques instants.`
            res.status(500).json({
                message,
                data: error
            })
        })

           
    })
}