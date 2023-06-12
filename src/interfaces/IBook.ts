export interface IBook extends Object {
  title: string
  slug: string
  totalPages: number
  yearPublished: number
  price: number
  autor: string[]
  editor: string
  genre: string[]
  synopsis: string
  ratingAverage?: number
  ratingQuantity: number
  language: string[]
  createdAt: Date
}
