import express from 'express'
import serveIndex from 'serve-index'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'

import coreSchema from './schema'

const app = express()

console.log(`DIRNAME IS ${__dirname}`)
console.log(`FILENAME ${__filename}`)

switch (process.env.ENV) {
  case 'dev':
    app.use(express.static('./build'))
    app.use(serveIndex('./build'))
    break
  default:
    app.use(express.static(__dirname))
    app.use(serveIndex(__dirname))
}

app.use('/graphql', bodyParser.json(), graphqlExpress({schema: coreSchema}))
app.get('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))

const server = app.listen(process.env.PORT | 8000, () => {
  const host = server.address().address
  const port = server.address().port
  console.log(`Server started successfully on http://${host}:${port}`)
})
