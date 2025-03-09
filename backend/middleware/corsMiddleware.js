const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5173', // Frontend URL
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,  // If using cookies or sessions
};

module.exports = cors(corsOptions);
