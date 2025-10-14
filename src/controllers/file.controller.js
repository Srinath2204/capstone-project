const fileService = require("../services/file.service");


const upload = (req, res) => {
    fileService.upload(req, res); 
};

const getFiles = (req, res) => {
    fileService.getFiles(req, res);
}

const download = (req, res) => {
    fileService.download(req, res);
}

const remove = (req, res) => {
    fileService.remove(req, res);
}

module.exports = {
    upload,
    download,
    getFiles,
    remove
}