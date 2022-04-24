import express from 'express';

const app = express();
const port = 5000;
app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});
app.listen(port, () => {
  console.info(`Server running on port ${port}`);
});