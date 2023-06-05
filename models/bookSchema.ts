import mongoose from "mongoose";
import { IBook } from "../interfaces/IBook";
import slugify from "slugify";

const BookSchema = new mongoose.Schema<IBook>(
    {
        title: {
            type: String,
            required: [true, 'Please insert the book title.'],
            minlength: [4, 'Book title must contain at least 4 characters.'],
            maxlength: [64, 'Book title cant have more than 64 characters.'],
            trim: true,
        },
        slug: {
            type: String
        },   
        totalPages: {
            type: Number,
            required: [true, 'Please insert how many pages the book has.'],
            min: [1, 'Book cant have less than 1 page.'],
        },
        yearPublished: {
            type: Number,
            min: 1800,
            max: new Date().getFullYear(),
            required: [true, 'Please insert the year the book was published.'],
        },
        price: {
            type: Number,
            required: [true, 'Please insert a price']
        },
        autor: {
            type: [String],
            required: [true, 'Please insert the book autor.']
        },
        editor: {
            type: String,
            required: [true, 'Please insert the book editor.'],
        },
        publisher: {
            type: String,
            required: [true, 'Please insert the book publisher.'],
        },
        genre: {
            type: [String],
            enum: ['Action', 'Drama', 'Romance', 'Adventure', 'Mistery', 'Sci-Fi', 'Horror', 'Fantasy'],
            required: true,
        },
        synopsis: {
            type: String,
            required: [true, 'Please insert the book synopsis.'],
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        },
        language: {
            type: [String],
            enum: ['Portuguese', 'English', 'Spanish'],
            required: [true, 'Please insert at least one language.']
        }
    },
    {
        versionKey: false
    }
)

BookSchema.pre('save', function () {
    this.slug = slugify(this.title, {
        lower: true,
        trim: true,
        replacement: '-'
    })
})

const Book = mongoose.model('Book', BookSchema);

export default Book;
