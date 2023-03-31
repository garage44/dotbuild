#!/usr/bin/env node
import {buildConfig} from './utils.js'
import fs from 'fs-extra'
import path from 'path'
import {hideBin} from 'yargs/helpers'
import loadSettings from './settings.js'
import getTask from './task.js'
import yargs from 'yargs'

(async() => {   

    const cli = {
        // eslint-disable-next-line no-console
        log(...args) {console.log(...args)},
    }

    yargs(hideBin(process.argv))
        .usage('Usage: $0 [task]')
        .detectLocale(false)
        .option('builddir', {
            default: '',
            describe: 'The directory to build to',
            type: 'string',
        })
        .option('metafile', {
            default: false,
            description: 'Add bundle meta information',
            type: 'boolean',
        })
        .option('minify', {
            default: false,
            description: 'Minify output',
            type: 'boolean',
        })
        .option('package', {
            default: '',
            describe: 'The target package',
            type: 'string',
        })
        .option('port', {
            alias: 'p',
            default: 3000,
            describe: 'port to bind the devserver on',
            type: 'number',
        })
        .option('sourceMap', {
            default: false,
            description: 'Include source mapping',
            type: 'boolean',
        })
        .middleware(async(argv) => {
            const settings = await loadSettings(argv)
            const tasks = await import(path.join(settings.dir.workspace, 'tasks.js'))
            const Task = getTask(settings)
            cli.tasks = tasks.loadTasks({settings, Task})
            // Make sure that the cache & build directories exist,
            // before executing any task.
            await Promise.all([
                fs.mkdirp(settings.dir.build),
                fs.mkdirp(settings.dir.cache),
            ])

            
            if (argv._.includes('dev')) {
                settings.dev.enabled = true
            }
            cli.settings = settings
            buildConfig(cli, argv)
        })
        .command('assets', 'copy assets', () => {}, (argv) => {
            cli.tasks.assets.start(argv)
        })
        .command('build', 'build application', () => {}, (argv) => {
            cli.tasks.build.start(argv)
        })
        .command('config', 'list build config', () => {}, (argv) => {
            cli.tasks.config.start(argv)
        })
        .command('dev', 'run a development server', () => {}, (argv) => {
            cli.tasks.dev.start(argv)
        })
        .command('html', 'build html file', () => {}, (argv) => {
            cli.tasks.html.start(argv)
        })
        .command('code', 'bundle javascript', () => {}, (argv) => {
            cli.tasks.code.start(argv)
        })

        .command('styles', 'bundle styles', () => {}, (argv) => {
            cli.tasks.styles.start(argv)
        })
        .demandCommand()
        .help('help')
        .showHelpOnFail(true)
        .argv
})()
