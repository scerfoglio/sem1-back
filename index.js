const projectRoutes = require('./src/modules/projects/project');
const express = require('express')
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
}

app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
});

// Middlewares
app.use(errorHandler);
app.use('/api', projectRoutes);

// Routes
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
