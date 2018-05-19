import express from 'express'
import serveIndex from 'serve-index'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { join as pathJoin } from 'path'
import coreSchema from './schema'

const app = express()

console.log(`DIRNAME IS ${__dirname}`)
console.log(`FILENAME ${__filename}`)

let usingPkg = process.pkg.entrypoint | false

let publicPath = usingPkg ? __dirname : pathJoin(__dirname, '/../../build')
app.use(express.static(publicPath))
app.use(serveIndex(publicPath))
app.use('/graphql', bodyParser.json(), graphqlExpress({schema: coreSchema}))
app.get('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))

const server = app.listen(process.env.PORT | 8000, () => {
  const host = server.address().address
  const port = server.address().port
  console.log(`Server started successfully on http://${host}:${port}`)
})
