const jsonschema = require('jsonschema');
const uuid = require('uuid');
const albumRepo = require('../repository/albumRepo');
const albumSchema = require('../schemas/albumSchema.json');

const createAlbum = async payload => {
    const validated = validateAlbum(payload);
    if(!validated.response) return {response: false, errors: validated.errors};
    const baseSongs = payload.songs;
    let songList = [];
    for(let i=0; i<baseSongs.length; i++){
        let song = {...baseSongs[i], 
            songID: uuid.v4()
        };
        songList.push(song);
    };
    let album = {
        title: payload.title,
        releaseDate: payload.releaseDate,
        artist: payload.artist,
        discs: payload.discs,
        songs: songList
    };
    const data = await albumRepo.createAlbum(album);
    if(!data) return {response: false, errors: "Could not create album"};
    return {response: true, message: `Album created`, data};
};

const getAllAlbums = async full => {
    const data = await albumRepo.getAllAlbums(full);
    return {response: true, message: "All albums found", data};
};

const getAlbum = async (id, full) => {
    const data = await albumRepo.getAlbum(id, full);
    if(!data) return {response: false, errors: `Album [${id}] not found`};
    return {response: true, message: `Album [${id}] found`, data};
};

const getAlbumsByArtist = async (artist, full) => {
    const data = await albumRepo.getAlbumsByArtist(artist, full);
    return {response: true, message: `Albums by ${artist} found`, data};
}

//EDIT LATER
const updateAlbum = async (id, payload) => {
    const validated = validateAlbum(payload);
    if(!validated.response) return {response: false, errors: validated.errors};
    const baseSongs = payload.songs;
    let songList = [];
    for(let i=0; i<baseSongs.length; i++){
        let song = {...baseSongs[i], 
            songID: uuid.v4()
        };
        songList.push(song);
    };
    let album = {
        title: payload.title,
        releaseDate: payload.releaseDate,
        songs: songList
    };
    const data = await albumRepo.updateAlbum(id, album);
    if(!data) return {response: false, errors: `Could not update album [${id}]`};
    return {response: true, message: `Album [${id}] updated`};
};

const deleteAllAlbums = async () => {
    const data = await albumRepo.deleteAllAlbums();
    return {response: true, message: "All albums deleted", data};
};

const deleteAlbum = async id => {
    const data = await albumRepo.deleteAlbum(id);
    if(!data) return {response: false, errors: `Could not delete album [${id}]`};
    return {response: true, message: `Album [${id}] deleted`};
};

const getAllSongs = async () => {
    const albumData = await albumRepo.getAllAlbums(true);
    let songs = [];
    albumData.forEach(album => {
        songs = songs.concat(album.songs);
    });
    console.log(songs);
    return {response: true, message: "All songs found", data: songs};
}

const getSongsByArtist = async artist => {
    const data = await albumRepo.getSongsByArtist(artist);
    if(!data.length) return {response: false, errors: `No songs found by artist ${artist}`};
    return {response: true, message: `All songs found by artist ${artist}`, data};
};

const getSongByID = async songID => {
    const data = await albumRepo.getSongByID(songID);
    if(!data.length) return {response: false, errors: `No song with songID ${songID} found`};
    return {response: true, message: `Song ${songID} found`, data};
}

const validateAlbum = payload => {
    const validator = jsonschema.validate(payload, albumSchema);
    if(!validator.valid){
        const errs = validator.errors.map(e => e.stack.substring(9));
        return {response: false, errors: errs};
    }
    return {response: true};
}

module.exports = {
    createAlbum,
    getAllAlbums,
    getAlbum,
    getAlbumsByArtist,
    updateAlbum,
    deleteAllAlbums,
    deleteAlbum,
    getAllSongs,
    getSongsByArtist,
    getSongByID
};