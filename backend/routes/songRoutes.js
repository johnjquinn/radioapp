const express = require('express');
const albumService = require('../services/albumService');
const { NotFoundError } = require('../util/expressError');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const artistQuery = req.query.artist;
        const idQuery = req.query.id;
        if(artistQuery){
            const data = await albumService.getSongsByArtist(artistQuery);
            if(!data.response) throw new NotFoundError(data.errors);
            return res.status(200).json(data);
        }
        if(idQuery){
            const data = await albumService.getSongByID(idQuery);
            if(!data.response) throw new NotFoundError(data.errors);
            return res.status(200).json(data);
        }
        const data = await albumService.getAllSongs();
        return res.status(200).json(data);
    } catch (error) {
        return next(error);
    }
});
router.put('/');
router.delete('/');

module.exports = router;