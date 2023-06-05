import mongoose from 'mongoose'

export const databaseConnect = async() => {
    await mongoose.connect(process.env.MONGO_URI!)
    .then(() => {console.log('DB CONNECTED!')})
    .catch(err => {console.log(err.message)
})
}