import express from 'express'
import serveIndex from 'serve-index'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { join as pathJoin } from 'path'
import coreSchema from './schema'

const app = express()

console.log(`DIRNAME IS ${__dirname}`)
console.log(`FILENAME ${__filename}`)

switch (process.env.ENV) {
  case 'development':
  case 'debug': {
    let publicPath = pathJoin(__dirname, '/../../build')
    console.log('Serving from ', publicPath)
    app.use(express.static(publicPath))
    app.use(serveIndex(publicPath))
    break
  }
  default: {
    let publicPath = __dirname
    console.log('Serving from ', publicPath, 'ENV is ', process.env.ENV)
    app.use(express.static(publicPath))
    app.use(serveIndex(publicPath))
  }
}

app.use('/graphql', bodyParser.json(), graphqlExpress({schema: coreSchema}))
app.get('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))

const server = app.listen(process.env.PORT | 8000, () => {
  const host = server.address().address
  const port = server.address().port
  console.log(`Server started successfully on http://${host}:${port}`)
})
