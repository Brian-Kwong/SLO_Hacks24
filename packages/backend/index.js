import  express  from 'express';
import { connect } from './services/mongo.js';

const app = express();

app.get('/login', (req, res) => {
  res.send('Hello World');
});

app.post('/signup', (req, res) => {
  res.send('Hello World');
});

app.post("/image",);
app.get("/images",);

// Connect to mongo DB
connect("test");

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});