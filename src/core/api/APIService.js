'use strict'

import MModule from '../common/MModule'
import express from 'express'
import serveIndex from 'serve-index'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { join as pathJoin } from 'path'
import coreSchema from '../schema'

export default class APIService extends MModule {
  async launch () {
    const app = express()

    // let usingPkg = typeof process.pkg !== 'undefined' | false
    // let pkgPath = usingPkg && pathJoin(process.pkg.entrypoint, '/../')
    let devPath = pathJoin(__dirname, '../../../build/')
    let publicPath = devPath

    console.info(`Serving from ${publicPath}`)

    app.use(express.static(publicPath))
    app.use(serveIndex(publicPath))
    app.use('/graphql', bodyParser.json(), graphqlExpress({schema: coreSchema}))
    app.get('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))

    const server = app.listen(process.env.PORT | 8000, () => {
      const host = server.address().address
      const port = server.address().port
      console.info(`Server started successfully on http://${host}:${port}`)
    })

    this.server = server
  }

  getServer () {
    return this.server
  }
}
