import express from 'express';
import { corsEnabledFunction } from './utils/cors';
import { config } from './config/config';
import router from './api';
import mongoose from 'mongoose';
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


app.use(express.json())

/** Ping server for health purpose */
app.get('/healthCheck', (req, res, next) => res.status(200).json({message: 'Hey...you ping me!'}))
app.use('/api/v1', router)

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