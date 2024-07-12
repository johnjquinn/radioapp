const db = require('../models');
const Album = db.albums;

exports.create = async (title, releaseDate, songs) => {
    const album = new Album({
        title: title,
        releaseDate: releaseDate,
        songs: songs
    });
    const data = await album.save();
    if(!data) return {response: false, error: "Unable to create album"};
    return {response: true, message: "Album created", data};
};

exports.findAll = async () => {
    const data = await Album.find({}).exec();
    return {response: true, message: "Albums found", data};
};

exports.findById = async (id) => {
    const data = await Album.findById(id).exec();
    if(!data) return {response: false, error: "Album not found"};
    return {response: true, message: "Album found", data};
};

exports.update = async (id, newAlbum) => {
    const data = await Album.findByIdAndUpdate(id, newAlbum, {useFindAndModify: false}).exec();
    if(!data) return {response: false, error: "Album cannot be found or updated"};
    return {response: true, message: "Album updated", data};
};

exports.delete = async (id) => {
    const data = await Album.deleteOne(id).exec();
    if(!data) return {response: false, error: "Album could not be deleted"};
    return {response: true, message: "Album deleted", data};
};

exports.deleteAll = async () => {
    const data = await Album.deleteAll().exec();
    return {response: true, message: "All albums deleted", data};
};