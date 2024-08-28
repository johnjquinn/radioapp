const express = require('express');
const userService = require('../services/userService');
const {NotFoundError, BadRequestError} = require('../util/expressError');
const {ensureLoggedIn, ensureAdmin} = require('../middleware/auth');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const data = await userService.registerUser(req.body);
        if(!data.response) throw new BadRequestError(data.errors);
        return res.status(201).json(data);
    } catch (error) {
        return next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const data = await userService.loginUser(req.body);
        if(!data.response) throw new BadRequestError(data.errors);
        return res.status(200).json(data);
    } catch (error) {
        return next(error);
    }
});

router.get('/', ensureLoggedIn, async (req, res, next) => {
    try {
        const idQuery = req.query.id;
        const usernameQuery = req.query.username;
        if(idQuery){
            const data = await userService.getUser(idQuery);
            if(!data.response) throw new NotFoundError(data.errors);
            return res.status(200).json(data);
        }
        if(usernameQuery){
            const data = await userService.getUserByUsername(usernameQuery);
            if(!data.response) throw new NotFoundError(data.errors);
            return res.status(200).json(data);
        }
        const data = await userService.getAllUsers();
        return res.status(200).json(data);
    } catch (error) {
        return next(error);
    }
});

router.get('/profile', ensureLoggedIn, async (req, res, next) => {
    const user_id = res.locals.user.id;
    try {
        const data = await userService.getUser(user_id);
        if(!data.response) throw new NotFoundError(data.errors);
        return res.status(200).json(data);
    } catch (error) {
        return next(error);
    }
});

router.post('/profile', ensureLoggedIn, async (req, res, next) => {
    const username = res.locals.user.username;
    try {
        const data = await userService.editProfile({username, ...req.body});
        if(!data.response) throw new BadRequestError(data.errors);
        return res.status(200).json(data);
    } catch (error) {
        return next(error);
    }
});

router.put('/', ensureLoggedIn, async (req, res, next) => {
    try {
        const passwordChangeQuery = req.query.passwordChange;
        if(passwordChangeQuery){
            const data = await userService.changePassword(req.body);
            if(!data.response) throw new BadRequestError(data.errors);
            return res.status(200).json(data);
        }
        throw new BadRequestError();
    } catch (error) {
        return next(error);
    }
});

router.delete('/', ensureAdmin, async (req, res, next) => {
    try {
        const idQuery = req.query.id;
        if(idQuery){
            const data = await userService.deleteUser(idQuery);
            if(!data.response) throw new BadRequestError(data.errors);
            return res.status(200).json(data);
        }
        const data = await userService.deleteAllUsers();
        return res.status(200).json(data);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;