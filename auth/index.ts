import express from 'express';
import { corsEnabledFunction } from './utils/cors';
import { config } from './config/config';

import mongoose from 'mongoose';
import {getAll, search} from './entities/authProxy/authProxy.controllers'
import logger from './middlewares/logger'

const app = express()
const port = config.PORT || 3000

// /** Connect to MongoDB */


mongoose.connection
	.on('connected', () => {
		console.log('[DB]: connected to database');

		app.listen(config.PORT, () => {
			console.log(`[DB]: running on port ${port}`);
		});

		app.on('error', (err) => console.log(err));
	})
	.on('error', (err) => console.log(err));
mongoose.connect(config.MONGODB_URL);

mongoose.connection.on('error', err => {
    console.log(err);
    process.exit()
  });

  
app.use(express.json())
app.use(logger)

/** Ping server for health purpose */
app.get('/healthCheck', (req, res, next) => res.sendStatus(200).json({message: 'Hey...you ping me!'}))
app.get('/:email/:token', getAll)
app.get('/search/:email', search) 

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