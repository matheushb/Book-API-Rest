type bookGenre = 'Action' | 'Drama' | 'Romance' | 'Adventure' | 'Mistery' | 'Sci-Fi' | 'Horror' | 'Fantasy'
type bookLanguage = 'Portuguese' | 'English' |  'Spanish' 

export interface ICreateBookDTO {
    title : string
    totalPages : number
    yearPublished: number  
    price: number
    autor: string[]
    editor: string
    publisher: string
    genre: bookGenre[]
    synopsis: string
    ratingAverage?: number
    ratingQuantity?: number
    language: bookLanguage[]
}

export interface IUpdateBookDTO extends Partial<ICreateBookDTO>{}
