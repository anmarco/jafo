const fs = require('fs');
const yaml = require('yaml')
const yup = require('yup')
const defaultOptions = yup.object().shape({
    path: yup.string().required(),
    folders: yup.array().of(yup.object().shape({
        name: yup.string().required(),
        formats: yup.array().of(yup.string()).required()
    }))
        .default([
            {
                name: "vids",
                formats: ['mp4', 'avi', 'wmv', 'mkv', 'webm', 'mov']
            },
            {
                name: "imgs",
                formats: ['jpg', 'jpeg', 'png', 'bmp', 'gif']
            },
            {
                name: "audios",
                formats: ['mp3', 'avi', 'wma', 'aac', 'ogg']
            },
            {
                name: "docs",
                formats: ['txt', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'odt', 'ods', 'odp', 'fodt', 'fods', 'fodp']
            },
            {
                name: "compressed",
                formats: ['zip', 'gz', 'rar', '7z']
            },
        ])
})
function parser(path) {
    try {
        const configFile = fs.readFileSync(path)
        const opts = yaml.parse(configFile.toString())
        return defaultOptions.validateSync(opts)
    } catch (error) {
        throw error
    }
}

module.exports = {
    parser,
    defaultOptions
}