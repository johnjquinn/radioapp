const mongoose = require('mongoose');
const MONGO_URL = require('../config').MONGO_URL;
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = MONGO_URL;
db.albums = require('./albumModel')(mongoose);
db.users = require('./userModel')(mongoose);
db.playlists = require('./playlistModel')(mongoose);

module.exports = db;