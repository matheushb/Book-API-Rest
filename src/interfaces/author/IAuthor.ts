export interface IAuthor extends Document {
  name: string
  age?: number
  nacionality: string
}

export interface IUpdateAuthorDTO extends Partial<IAuthor> {}
