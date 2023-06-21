import express from 'express';
import { corsEnabledFunction } from './utils/cors';
import { config } from './config/config';

const app = express()
const port = config.PORT || 3000

app.use(express.json())

/** Ping server for health purpose */
app.get('/healthCheck', (req, res, next) => res.status(200).json({message: 'Hey...you ping me!'}))

app.use((req, res, next) => {
    corsEnabledFunction(req, res);
    next()
});

app.listen(port, () => {
    console.log(`Server running on ${port}`)
  }).on('error', function(err) { 
    console.log(err)
    process.exit(1);
  });
  
  module.exports = app