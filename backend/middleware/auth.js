const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config');
const { UnauthorizedError } = require('../util/expressError');

const authenticateJWT = (req, res, next) => {
    try {
        const authHeader = req.headers && req.headers.authorization;
        if(authHeader){
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            res.locals.user = jwt.verify(token, SECRET_KEY);
        }
        return next();
    } catch (error) {
        return next(error);
    }
}

const ensureLoggedIn = (req, res, next) => {
    try {
        if(!res.locals.user) throw new UnauthorizedError();
        return next();
    } catch (error) {
        return next(error);
    }
}

const ensureAdmin = (req, res, next) => {
    try {
        if(!res.locals.user || res.locals.user.role !== "admin"){
            throw new UnauthorizedError();
        }
        return next();
    } catch (error) {
       return next(error); 
    }
};

const ensureCorrectUserOrAdmin = (req, res, next) => {
    try {
        const user = res.locals.user;
        if(!(user && (user.role || user.username === req.params.username))) {
            throw new UnauthorizedError();
        }
        return next();
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    authenticateJWT,
    ensureLoggedIn,
    ensureAdmin,
    ensureCorrectUserOrAdmin
}