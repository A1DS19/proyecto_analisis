const mongoose = require('mongoose');
mongoose.plugin(require('meanie-mongoose-to-json'));
mongoose.set('debug', true);

const mongo_db_connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DB CONNECTION WAS SUCCESSFULL`);
  } catch (error) {
    console.log(`DB CONNECTION ERROR\n${error}`);
  }
};

module.exports = { mongo_db_connection };
