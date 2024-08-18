const jsonschema = require('jsonschema');
const albumRepo = require('../repository/albumRepo');
const songSchema = require('../schemas/songSchema.json');

const createSong = async payload => {

};

const getAllSongs = async () => {

};

const getSongByIds = async (albumId, songId) => {

};

const getSongsByNames = async (artist, title) => {

};

const updateSong = async (albumId, discNum, trackNum, payload) => {

};

const deleteSong = async (albumId, songId) => {

};

const validateSong = payload => {
    const validator = jsonschema.validate(payload, songSchema);
    if(!validator.valid){
        const errs = validator.errors.map(e => e.stack.substring(9));
        return {response: false, errors: errs};
    }
    return {response: true};
}


module.exports = {
    createSong,
    getAllSongs,
    getSongByIds,
    getSongsByNames,
    updateSong,
    deleteSong
};