type bookGenre = 'Action' | 'Drama' | 'Romance' | 'Adventure' | 'Mistery' | 'Sci-Fi' | 'Horror' | 'Fantasy'
type bookLanguage = 'Portuguese' | 'English' |  'Spanish' 

export default interface CreateBookDTO {
    title : string
    totalPages : number
    yearPublished: number  
    price: number
    autor: string[]
    editor: string
    publisher: string
    genre: bookGenre[]
    synopsis: string
    rating?: number
    language: bookLanguage[]
}