
import app from './app'

import { connectDB } from './config/database'
import { PORT } from './utils/constants'


app.listen(PORT,()=>{
    connectDB()
    console.log(`http://localhost:${PORT}`)
})


