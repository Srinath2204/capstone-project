const fs = require("fs");
const baseUrl = "http://localhost:3000/files/";
const Book = require("../models/book");


const upload = async (req, res) => {
    try {
        if(!req.file){
            res.status(400).send({message : "Please upload a file"})
        }
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId);
        if(!book){
            res.status(404).send({message: `Book with ID ${bookId} is not found`})
        }
        res.status(200).send({message : "File uploaded successfully"})
    } catch (error) {
        res
        .status(500)
        .send({ message: error.message || "Error in uploading file" });
    } 
};

const getFiles = async (req, res) => {
    try {
        const directoryPath = __basedir + "/uploads/";
        fs.readdir(directoryPath, function(files, err){
            if(err){
                res.status(500).send({message : err })
            }
            let fileInfo = []
            files.forEach(file => {
                fileInfo.push({
                    name : file,
                    base_url : baseUrl + file
                })
            });
        })
    } catch (error) {
        res
        .status(500)
        .send({ message: error.message || "Error in fetching files" });
    }
}

const download = async (req, res) => {
    try {
        const fileName = req.params.name;
        const bookId = req.params.bookId;
        const directoryPath = __basedir + `/src/uploads/${bookId}`;

        res.download(directoryPath + fileName, fileName, (err) => {
            if(err){
               res.status(500).send({message: "Could not download the file. " + err}); 
            }
        })

    } catch (error) {
        res
        .status(500)
        .send({ message: error.message || "Error in downloading file" });
    }
}

const remove = async (req, res) => {
    try {
        const fileName = req.params.fileName;
        const bookId = req.params.bookId;
        const directoryPath = __basedir + `/src/uploads/${bookId}/`;
        fs.unlink(directoryPath + fileName, (err) => {
            if(err){
                res.status(500).send({message : "Could not delete file" + err})
            }
            fs.readdir(directoryPath, (err, files) => {
                if(err){
                    res.status(500).send({message: "Error in reading directory" + err})
                }
                if(files.length === 0){
                    fs.rmdir(directoryPath, (err) => {
                        if(err){
                            res.status.send({message: "Error in deleting folder"  + err})
                        }
                        return res.status(200).send({message: "Folder and file deleted successfully"});
                    })
                }
                else {
                    res.status(200).send({message : "File deleted successfully"})
                }
            })
        })
    } catch (error) {
         res
        .status(500)
        .send({ message: error.message || "Error in deleting file" });
    }
}

module.exports = {
    upload,
    download,
    getFiles,
    remove
}