import router from './routes'

let express = require('express')
let cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

const port = 8081
app.listen(port, () => console.log('Server is running...'))
