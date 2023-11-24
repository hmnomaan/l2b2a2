import app from './app';
import config from './app/config';

import mongoose from 'mongoose';

function main() {
  try {
    mongoose.connect(config.database_url as string);
    console.log('Database Connected..! ');

    app.listen(config.port, () => {
      console.log(`Server listening on port :: ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
