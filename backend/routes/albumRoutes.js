const express = require('express');
const albumService = require('../services/albumService');
const { BadRequestError, NotFoundError } = require('../util/expressError');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const data = await albumService.createAlbum(req.body);
        if(!data.response) throw new BadRequestError(data.errors);
        return res.status(201).json(data);
    } catch (error) {
        return next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const idQuery = req.query.id;
        const fullQuery = req.query.full || false;
        const artistQuery = req.query.artist;
        if(idQuery){
            const data = await albumService.getAlbum(idQuery, fullQuery);
            if(!data.response) throw new NotFoundError(data.errors);
            return res.status(200).json(data);
        }
        if(artistQuery){
            const data = await albumService.getAlbumsByArtist(artistQuery, fullQuery);
            return res.status(200).json(data);
        }
        const data = await albumService.getAllAlbums(fullQuery);
        return res.status(200).json(data);
    } catch (error) {
        return next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        const idQuery = req.query.id;
        const data = await albumService.updateAlbum(id, req.body);
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
            const data = await albumService.deleteAlbum(idQuery);
            if(!data.response) throw new BadRequestError(data.errors);
            return res.status(200).json(data);
        }
        const data = await albumService.deleteAllAlbums();
        return res.status(200).json(data);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;