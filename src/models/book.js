const mongoose = require("mongoose");

const Book = mongoose.model(
    'Book',
    new mongoose.Schema(
        {
            title: String,
            author: String,
            genre: String,
            publishedDate: Number,
            description: String
        },
        {
            timestamps: true
        }
    )
)

module.exports = Book;