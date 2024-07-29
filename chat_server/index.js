const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());
require('./adapter/connectionDB')

app.get('/',(req,res)=>{
    res.send('Api is running')
})





app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
