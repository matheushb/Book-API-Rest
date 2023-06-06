import express, { urlencoded } from 'express'
import * as dotenv from 'dotenv';
import bookRouter from './routes/bookRouter';
import { databaseConnect } from './config/mongoConfig';
import { errorHandlingMiddleware } from './middlewares/errorHandling';
dotenv.config();

const app = express();

process.on('uncaughtException', (error) => {
    console.log('Server closing due to uncaught exception.');
    console.log(error)
        process.exit(1)
})

app.use(express.json())
app.use(urlencoded({extended: true}))
app.use('/api/v1/', bookRouter)
app.use(errorHandlingMiddleware)
app.all('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: `No route found for ${req.originalUrl}`    
    })
})

databaseConnect()


const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});

process.on('unhandledRejection', (error) => {
    console.log('Server closing due to unhandled Promise Rejection')
    console.log(error);
    server.close(() => {
        process.exit(1)
    })
})
