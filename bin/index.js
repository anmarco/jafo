#!node
const fs = require('fs')
const path = require('path')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const {parser, defaultOptions} = require('../lib/config-parser')
const {vacuum} = require('../lib/vacuum')
const argv = yargs(hideBin(process.argv))
    .option('path', {
        alias: 'p',
        type: 'string',
        description: 'Path to make cleaning'
    })
    .option('config', {
        alias: 'c',
        type: 'string',
        description: 'Path to config file',
    })
    .conflicts({
        config: "path",
        path: "config"
    })
    .check( args => {
        if(!args.path && args._) args.path = args._[0]
        if(!args.path && !args.c) throw "You should pass a config file or a path"
        if(args.c && !fs.existsSync(args.config)) throw "You should pass a valid config file"
        if(args.path &&!fs.existsSync(args.path)) throw "You should pass a valid path"
        return true
    })
    .argv;

try {
    let configs = (argv.config) ? 
                        parser(argv.config) : 
                        defaultOptions.cast({ path: argv.path })
    
    configs.path = path.resolve(configs.path)

    vacuum(configs)

} catch (error) {
    console.error(error.message)
}