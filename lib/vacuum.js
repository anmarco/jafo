const fs = require('fs')
const ProgressBar = require('progress')

async function vacuum(opts) {
    const bar = new ProgressBar(`creating folders :current/${opts.folders.length}`, {total: opts.folders.length})
    for (const folder of opts.folders) {
        try {
            fs.mkdirSync(`${opts.path}/${folder.name}`)
            bar.tick()
        } catch (error) {
            if (error.code != "EEXIST") throw error
        }

        const dir = fs.readdirSync(opts.path)
                        .filter(e => RegExp(`.+\.(${folder.formats.join('|')})$`, 'i').test(e));
        const dirbar = new ProgressBar(`copying :folder [:bar] :percent`, {
            complete: '=',
            incomplete: ' ',
            width: 35,
            total: dir.length
            });
        dir.forEach(async el => {
            new Promise( (resolve, reject) => 
                fs.createReadStream(`${opts.path}/${el}`)
                .pipe(fs.createWriteStream(`${opts.path}/${folder.name}/${el}`)
                        .once('close', function() {
                            fs.rmSync(`${opts.path}/${el}`,{force:false})
                            resolve(dirbar.tick({
                                folder: folder.name,
                                file: el
                            }))
                        })
                        .on('error', function(err) {
                            reject(err)
                        })
                )
                .on('error', function(err) {
                    reject(err)
                })
                .once('unpipe', function() {
                    resolve()
                })

            )
        })
    }

}

module.exports = {
    vacuum
}