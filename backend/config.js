require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || 'njoserkgf;welfgiyuerhgbeas';
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/radioapp";
const PORT = +process.env.PORT || 9000;
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12

module.exports = {SECRET_KEY, MONGO_URL, PORT, BCRYPT_WORK_FACTOR};