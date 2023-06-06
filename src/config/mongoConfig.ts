import mongoose from 'mongoose'

export const databaseConnect = async() => {
    await mongoose.connect('mongodb+srv://matheus:matheus@books.is1pcld.mongodb.net/books?')
    .then(() => {console.log('DB CONNECTED!')})
    .catch(err => {console.log(err.message)
})
}