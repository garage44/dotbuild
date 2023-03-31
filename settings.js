import fs from 'fs-extra'
import {nanoid} from 'nanoid'
import path from 'path'

export default async(argv) => {
    const settings = {
        dev: {
            enabled: false,
            host: '0.0.0.0',
            port: argv.port,
        },
        dir: {
            workspace: path.resolve(process.cwd()),
        },
        minify: argv.minify,
        package: argv.package,
        sourceMap: argv.sourceMap,
    }

    settings.dir.base = path.resolve(settings.dir.workspace, argv.package)
    if (argv.builddir) {
        settings.dir.build = path.resolve(path.join(argv.builddir, `.build`))
    } else {
        settings.dir.build = path.resolve(path.join(settings.dir.base, `.build`))
    }
    settings.dir.code = path.resolve(path.join(settings.dir.base, 'src'))

    settings.dir.assets = path.resolve(path.join(settings.dir.code, `assets`))    
    settings.dir.theme = path.resolve(path.join(settings.dir.base, `theme`))
    settings.dir.cache = path.resolve(path.join(settings.dir.base, `.cache`))
    
    settings.dir.components = path.resolve(path.join(settings.dir.code, `components`))
    settings.version = JSON.parse((await fs.readFile(path.join(settings.dir.base, 'package.json')))).version
    settings.buildId = nanoid()

    return settings
}
