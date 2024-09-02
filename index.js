const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = 3000;

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Custom middleware to verify request time
const verifyTime = (req, res, next) => {
  const day = new Date().getDay();
  const hour = new Date().getHours();

  if ((day >= 1 && day <= 5) && (hour >= 9 && hour <= 17)) {
    next();
  } else {
    res.status(403).send('Access denied. The application is only available during working hours.');
  }
};

// Apply the middleware to all routes
app.use(verifyTime);

// Define routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/our-services', (req, res) => {
  res.render('services');
});

app.get('/contact-us', (req, res) => {
  res.render('contact');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}/`);
});