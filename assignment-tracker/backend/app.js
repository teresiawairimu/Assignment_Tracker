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
const helmet  = require('helmet');

/**
 * Middleware for setting security headers
 * @module helmet
 * @type {Function}
 */
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


/**
 * Middleware for setting up CORS
 * @module cors
 * @type {Function}
 * @see {@link https://www.npmjs.com/package/cors}
 */
const corsOptions = {
    origin: ['http://localhost:3001', 'https://portfolio-project-7c952.web.app', 'https://rocky-temple-55866-fb402add5e56.herokuapp.com'],
    methods: ['GET', 'POST', 'PUT' , 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials : true,
  };

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

/**
 * Middleware for parsing JSON bodies
 * @module express.json
 * @type {Function}
 */
app.use(express.json());

/**
 * Basic route to check if the server is running
 * @name Health check
 * @route {GET} /
 * @returns {string}- The message "Backend server is running"
 * @access public
 */
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

/**
 * The user route
 * @module userRoute
 */
app.use('/api/users', userRoute);

/**
 * The assignment route
 * @module assignmentRoute
 */
app.use('/api/assignments', assignmentRoute);

/**
 * The category route
 * @module categoryRoute
 */
app.use('/api/categories', categoryRoute);

/**
 * Middleware for handling 404 errors
 * @module 404
 * @type {Function}
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {string} - The message "404 - Not Found"
 * @access public
 */
app.use((req, res, next) => {
  res.status(404).send('404 - Not Found');
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('500 - Internal Server Error');
});

/**
 * Middleware for handling 500 errors
 * @module 500
 * @type {Function}
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {string} - The message "500 - Internal Server Error"
 * @access public
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('500 - Internal Server Error');
});


/**
 * The cron job to send email notifications
 * @module node-cron
 * @type {Function}
 * @description Runs every day at 10:00 AM
 */
cron.schedule('* 10 * * *', async () => {
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

/**
 * Starts the server on specified port
 * @constant PORT - The port on which the server will listen
 * @type {number}
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});