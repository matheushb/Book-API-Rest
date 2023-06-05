export interface IBook {
    title : string
    slug: string
    totalPages : number
    yearPublished: number  
    price: number
    autor: string[]
    editor: string
    publisher: string
    genre: string[]
    synopsis: string
    rating?: number
    language: string[]
}