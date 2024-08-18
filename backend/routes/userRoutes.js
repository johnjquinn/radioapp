const express = require('express');
const userService = require('../services/userService');
const {NotFoundError, BadRequestError} = require('../util/expressError');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const data = await userService.createUser(req.body);
        if(!data.response) throw new BadRequestError(data.errors);
        return res.status(201).json(data);
    } catch (error) {
        return next(error);
    }
});

router.get('/', async (req, res, next) => {
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

router.put('/', async (req, res, next) => {
    try {
        const idQuery = req.query.id;
        const data = await userService.updateUser(idQuery, req.body);
        if(!data.response) throw new BadRequestError(data.errors);
        return res.status(200).json(data);
    } catch (error) {
        return next(error);
    }
});

router.delete('/', async (req, res, next) => {
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