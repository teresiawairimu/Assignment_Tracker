const express = require('express');
const cors = require('cors');
const app = express();
const cron = require('node-cron');
require('dotenv').config();
const { sendEmailNotification } = require('./controllers/notificationController');
const userRoute = require('./routes/userRoute');
const assignmentRoute = require('./routes/assignmentRoute');
const categoryRoute = require('./routes/categoryRoute');
const { db } = require('./firebaseAdmin');
const { helmet } = require('helmet');

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"],
        imgSrc: ["'self'", "https://rocky-temple-55866-fb402add5e56.herokuapp.com"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
      },
    },
  })
);





const corsOptions = {
    origin: ['http://localhost:3001', 'https://portfolio-project-7c952.web.app'],
    methods: ['GET', 'POST', 'PUT' , 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials : true,
  };

  

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.use(express.json());


app.use('/api/users', userRoute);
app.use('/api/assignments', assignmentRoute);
app.use('/api/categories', categoryRoute);


cron.schedule('* * * * *', async () => {
  const userId  = req.user.uid;

  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const endOfTomorrow = new Date(tomorrow);
  endOfTomorrow.setHours(23, 59, 59, 999);

  try {
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      console.error('User not found');
      return;
    }
    const user = userDoc.data();

     
      const assignmentsSnapshot = await db.collectionGroup('assignments')
      .where('dueDate', '>=', tomorrow)
      .where('dueDate', '<=', endOfTomorrow)
      .where('notification', '==', false)
      .get();


      for (const assignmentDoc of assignmentsSnapshot.docs) {
        const assignment = assignmentDoc.data();
    
        const dueDate = assignment.dueDate.toDate();
 

        await sendEmailNotification(user.email, assignment.name, dueDate);
        await assignmentDoc.ref.update({ notification: true });
      }
    

  } catch (error) {
    console.error('Error running the cron job:', error);
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});