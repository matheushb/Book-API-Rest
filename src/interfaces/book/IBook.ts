import mongoose from 'mongoose'

export interface IBook extends Object {
  title: string
  slug: string
  totalPages: number
  yearPublished: number
  price: number
  author: mongoose.Schema.Types.ObjectId
  editor: string
  genre: string[]
  synopsis: string
  ratingAverage?: number
  ratingQuantity: number
  language: string[]
  createdAt: Date
}
