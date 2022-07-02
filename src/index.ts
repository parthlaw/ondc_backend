import express from 'express';
import cors from 'cors';
import routes from './routes';
const app = express();
const PORT = process.env.PORT || 8000;

const start = async () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  var whitelist = ['http://localhost:3000', 'https://bookmatic-assignment.vercel.app'];
  var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  };
  app.use(cors(corsOptions));
  app.use('/', routes);
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
};
start();