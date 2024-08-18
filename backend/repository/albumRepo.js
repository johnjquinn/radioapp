const db = require('../models');
const Album = db.albums;

const createAlbum = async aData => {
    const album = new Album(aData);
    const data = await album.save();
    return data;
};

const getAllAlbums = async full => {
    let data = null;
    if(full) data = await Album.find({}).exec();
    else data = await Album.find({}, 'title artist releaseDate').exec();
    return data;
};

const getAlbum = async (id, full) => {
    let data = null;
    if(full) data = await Album.find({_id: id}, 'title artist releaseDate').exec();
    else data = await Album.findById(id).exec();
    return data;
};


const getAlbumsByArtist = async (artist, full) => {
    let data = null;
    if(full) data = await Album.find({artist: artist}).exec();
    else data = await Album.find({artist: artist}, 'title artist releaseDate').exec();
    return data;
}

const updateAlbum = async (id, newAlbum) => {
    const data = await Album.findByIdAndUpdate(id, newAlbum, {useFindAndModify: false}).exec();
    return data;
};

const deleteAllAlbums = async () => {
    const data = await Album.deleteMany({}).exec();
    return data;
};

const deleteAlbum = async id => {
    const data = await Album.findByIdAndDelete(id).exec();
    return data;
};

module.exports = {
    createAlbum,
    getAllAlbums,
    getAlbum,
    getAlbumsByArtist,
    updateAlbum,
    deleteAllAlbums,
    deleteAlbum
};