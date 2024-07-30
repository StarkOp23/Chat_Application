const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());
require('./adapter/connectionDB')
const userRoutes = require('./Routes/userRoutes');


app.use('/api/user', userRoutes);


// !error handling middleware
app.use((err, req, res, next) => {
    res.status(400).json({ error: true, message: err.message, data: "ok" })
})

app.use("*", (req, res, next) => {
    res.status(404).json({ message: "Page not found" })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
