import express from 'express'
import { connectDB } from './db/config.js'
import { configDotenv } from 'dotenv';
import todosRoute from './routes/todosRoute.js';
import usersRoute from './routes/usersRoute.js'
import { auth } from './middlewares/authMiddleware.js';
import { errorHandler } from './middlewares/globalErrorHandler.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

configDotenv();

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json())

// Serve static files from dist
app.use(express.static(path.join(__dirname, '../Frontend/dist')));

// Only serve index.html for routes NOT containing a file extension
app.get('*', (req, res) => {
  // If the request is for an asset (has a dot), skip fallback
  if (req.path.includes('.') && !req.path.endsWith('.html')) {
    return res.sendStatus(404);
  }

  res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
});

//Protecting routes globally. It will ensure that all the sub-routes will too get protected.
app.use('/api/todos',auth);
app.use('/api/users/me',auth)
//To keep certain sub-routes public, you can:Apply auth selectively inside route definitions where it's needed.

app.use('/api/todos',todosRoute);
app.use('/api/users',usersRoute);

app.use(errorHandler);

app.get('/api/public',(req,res)=>{
  res.send('This is public')
})

async function start() {
  try {
    await connectDB();
    console.log('db connected')
    app.listen(PORT,()=>{
      console.log(`server running on port ${PORT}`)
    })
  } catch (error) {
    console.log('error',error);
  }
}

start();
