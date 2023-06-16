import mongoose from 'mongoose'
import { IAuthor } from '../interfaces/author/IAuthor'

const AuthorSchema = new mongoose.Schema<IAuthor>(
  {
    name: {
      type: String,
      required: [true, 'A name is required.'],
      trim: true,
      min: 6,
      max: 50,
    },
    age: {
      type: Number,
      min: 10,
      max: 110,
    },
    nacionality: {
      type: String,
      required: [true, 'A nacionality is required.'],
    },
  },
  {
    versionKey: false,
  }
)

const Authors = mongoose.model('Authors', AuthorSchema)
export default Authors
