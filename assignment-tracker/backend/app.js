const express = require('express');
const cors = require('cors');
const app = express();
const userRoute = require('./routes/userRoute');
const assignmentRoute = require('./routes/assignmentRoute');
const categoryRoute = require('./routes/categoryRoute');



app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:3001', 'https://localhost:3000'],
    methods: ['GET', 'POST', 'PUT' , 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials : true,
  };

  

app.use(cors(corsOptions));




app.use('/api/users', userRoute);
app.use('/api/assignments', assignmentRoute);
app.use('/api/categories', categoryRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});