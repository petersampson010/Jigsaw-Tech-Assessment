const express = require('express');

const insightsRouter = require('./routers/insights');

const app = express();

// app.get('/insights/categories', (req, res) => {
//   res.send('categories')
// })

// mounts the path '/insights' to any path on insightsRouter
app.use('/insights', insightsRouter)

// handle errors
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ message: error.message });
  next();
});

module.exports = app;
