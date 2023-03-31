import _ from 'lodash'
import _glob from 'glob'
import bodyParser from 'body-parser'
import chokidar from 'chokidar'
import express from 'express'
import httpProxy from 'http-proxy'
import tinylr from 'tiny-lr'
import util from 'util'
const glob = util.promisify(_glob)

export {Scss} from './utils.js'
export {glob}
export const watch = chokidar.watch
export const template = _.template

export const devServer = function(settings, tasks) {
    process.on('SIGINT', () => { process.exit(0) })
    const app = express()
    const proxy = httpProxy.createProxyServer()
    
    app.use('/', express.static(settings.dir.build))
    app.use(bodyParser.json())
    app.use(tinylr.middleware({app}))
    app.get('*', function(req, res) {
        res.sendFile(path.join(settings.dir.build, 'index.html'))
    })
    app.listen({
        host: settings.dev.host, 
        port: settings.dev.port
    })

    const debounce = {options: {trailing: true}, wait: 1000}
    const assets = _.throttle(async() => {
        await tasks.assets.start()
        tinylr.changed('index.html')
    }, debounce.wait, debounce.options)

    const html = _.throttle(async() => {
        await tasks.html.start({minify})
        tinylr.changed('index.html')
    }, debounce.wait, debounce.options)

    const code = _.throttle(async() => {
        await tasks.code.start({incremental: true, metafile: false, minify: false, sourceMap: true})
        tinylr.changed(`app.${settings.buildId}.js`)
    }, debounce.wait, debounce.options)

    const stylesApp = _.throttle(async() => {
        await Promise.all([
            tasks.stylesApp.start({minify, sourceMap}),
            tasks.stylesComponents.start({minify, sourceMap}),
        ])
        tinylr.changed(`app.${settings.buildId}.css`)
        tinylr.changed(`components.${settings.buildId}.css`)
    }, debounce.wait, debounce.options)

    const stylesComponents = _.throttle(async() => {
        await tasks.scssComponents.start({minify, sourceMap})
        tinylr.changed(`components.${settings.buildId}.css`)
    }, debounce.wait, debounce.options)

    return {app, proxy, runner: {assets, html, code, stylesApp, stylesComponents}}
}