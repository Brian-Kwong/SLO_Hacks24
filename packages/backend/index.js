import  express  from 'express';

const app = express();

app.get('/login', (req, res) => {
  res.send('Hello World');
});

app.post('/signup', (req, res) => {
  res.send('Hello World');
});

app.post("/image",);
app.get("/images",);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});