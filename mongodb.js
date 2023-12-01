const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/OnlineBookstore');

// Export the mongoose instance
module.exports = mongoose;
