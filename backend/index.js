const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Compound = require('./models/compound-schema')(sequelize);
const compoundsRouter = require('./routes/compounds');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/compounds', compoundsRouter);

app.get('/', (req, res) => res.send('Backend running'));

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
  app.listen(3000, () => console.log('Server running on port 3000'));
});