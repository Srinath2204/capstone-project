const Book = require("../models/book");
const Role = require("../models/role");


const validateCreatedUserOrAdmin = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        const userId = req.userId;

        const userRole = await Role.findById(req.role);
        const book = await Book.findById(bookId);
        if(!book){
            res.status(404).send({message: `Book with Id ${bookId} not found`})
        }

        if(userRole.name === "Admin" || userId === book.createdBy){
            next();
        }
        else{
            res.status(403).send({message: "Only Admin or User who created the book can upload files"})
        }

    } catch (error) {
        res.status(500).send({message: error})
    }
}

module.exports = {validateCreatedUserOrAdmin}