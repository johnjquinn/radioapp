const express = require('express');
const userRouter = require('./routes/userRoutes');
const albumRouter = require('./routes/albumRoutes');
const songRouter = require('./routes/songRoutes');
const tokenRouter = require('./routes/tokenRoute');
const cors = require('cors');
const logger = require('./util/logger');
const db = require('./models');
const { authenticateJWT } = require('./middleware/auth');

const PORT = 9000;
const app = express();


db.mongoose.connect(db.url).then(() => logger.info("Database Connected")).catch(err => {logger.error(`Database Error: ${err}`); process.exit();});
app.use((req, res, next) => {
    logger.info(`${req.method} request at ${req.url}`);
    next();
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded());
app.use(authenticateJWT);
app.use('/users', userRouter);
app.use('/albums', albumRouter);
app.use('/songs', songRouter);
app.use('/token', tokenRouter);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message;
    return res.status(status).json({
        error: {message, status}
    });
});


app.get('/', (req, res) => {
    res.json({message: "Hello World"});
});

app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`);
});
