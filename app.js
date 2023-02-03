const express = require('express')
const app = express()


// const {
//     success ,  getUniqueId
// } = require('./helper.js')
const sequelize = require('./src/db/sequelize')
//  sequelize.initDb()

app.use(express.json())
const port = process.env.PORT || 3000
app.get('/', (req, res) => res.send('Welcom to the Ninja Temple !👋'))



// On importe notre point de terminaison,
// qui est exporté sous la forme d'une fonction. 
require('./src/routes/get')(app)
require('./src/routes/getByPk')(app)
require('./src/routes/update')(app)
require('./src/routes/creat')(app)
require('./src/routes/delete')(app)
require('./src/routes/login')(app)

//gestion d'erreur
app.use(({res}) => {
    const message = 'Qui va la ???👀.'
    res.status(404).json({message});
   
  });



 
// On met en place une nouvelle route aurpès d'Express,
// En appelant notre point de terminaison avec le paramètre 'app'.
// Pour rappel, 'app' est notre application Express.


app.listen(port, () => console.log(`yo check your app on  : http://localhost:${port}`))