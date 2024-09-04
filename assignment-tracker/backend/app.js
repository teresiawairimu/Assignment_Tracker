const express = require('express');
const cors = require('cors');
const app = express();
const userRoute = require('./routes/userRoute');

app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3002',
    methods: ['GET', 'POST', 'PUT' , 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.use('/api/users', userRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});