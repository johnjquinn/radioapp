const express = require('express');
const cors = require('cors');
const logger = require('./util/logger');
const db = require('./models');

const PORT = 9000;
const app = express();

db.mongoose.connect(db.url).then(() => logger.info("Database Connected")).catch(err => {logger.error(`Database Error: ${err}`); process.exit();});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded());

app.use((req, res, next) => {
    logger.info(`${req.method} request at ${req.url}`);
    next();
})

app.listen(() => {
    console.log(`Server is listening on Port ${PORT}`);
});