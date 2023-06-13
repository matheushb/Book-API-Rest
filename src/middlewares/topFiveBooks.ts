import { NextFunction, Request, Response } from 'express'

export const AliasTopBooks = (req: Request, res: Response, next: NextFunction) => {
  req.query.limit = '5'
  req.query.sort = '-ratingAverage,price'
  req.query.fields = 'title,totalPages,price,autor,genre,ratingAverage,ratingQuantity,-_id'
  next()
}
