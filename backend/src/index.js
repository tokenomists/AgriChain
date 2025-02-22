import express from 'express';
import router from './routes/api.route.js';
import cors from 'cors';

const PORT = process.env.PORT || 5432;

const app = express();

app.use(
    cors({
      origin: "http://localhost:3000", 
      methods: "GET,POST,PUT,DELETE", 
      credentials: true,
    })
  );

app.use(express.json());

app.use('/api/data', router);

app.listen(PORT, () => console.log(`Server is listening at PORT ${PORT}`));
