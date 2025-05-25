const fs = require('fs');
const { parse } = require('csv-parse');
const sequelize = require('../config/database');
const Compound = require('../models/compound-schema')(sequelize);

async function importCSV() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced');

    const rows = [];
    const stream = fs.createReadStream('./csv-file/compound.csv')
      .pipe(parse({ columns: true }));

    stream
      .on('data', (row) => {
        rows.push(row);
      })
      .on('end', async () => {
        let rowCount = rows.length;
        console.log(`Collected ${rowCount} rows`);

        for (const row of rows) {
          try {
            await Compound.create({
              id: row.id,
              name: row.CompoundName,
              image: row.strImageSource,
              description: row.CompoundDescription,
            });
          } catch (err) {
            console.error('Error inserting row:', row, err);
          }
        }
        console.log('CSV imported successfully');
        await sequelize.close(); 
        process.exit(0);
      })
      .on('error', (err) => {
        console.error('CSV parse error:', err);
        process.exit(1);
      });
  } catch (err) {
    console.error('Import error:', err);
    process.exit(1);
  }
}

importCSV();