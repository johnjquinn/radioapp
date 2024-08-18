const db = require('../models');
const Playlist = db.playlists;

exports.create = async (name, createdBy, songs) => {
    let totalSeconds = songs.reduce((acc, curr) => acc + curr.seconds, 0);
    const playlist = new Playlist({
        name,
        createdBy,
        totalSeconds,
        songs
    });
    const data = await playlist.save();
    if(!data) return {response: false, error: "Could not create playlist"};
    return {response: true, message: "Playlist created", data};
};

exports.findAll = async () => {
    const data = await Playlist.find({}).exec();
    return {response: true, message: "All Playlists Found", data};
};

exports.findById = async (id) => {
    const data = await Playlist.findById(id).exec();
    if(!data) return {response: false, error: "Could not find playlist"};
    return {response: true, message: "Playlist found", data};
};

exports.update = async (id, newPlaylist) => {
    const data = await Playlist.findByIdAndUpdate(id, newPlaylist, {useFindAndModify: false}).exec();
    if(!data) return {response: false, error: "Could not update playlist"};
    return {response: true, message: "Playlist updated", data};
};

exports.delete = async (id) => {
    const data = await Playlist.deleteOne(id).exec();
    if(!data) return {response: false, error: "Could not delete playlist"};
    return {response: true, message: "Playlist deleted", data};
};

exports.deleteAll = async () => {
    const data = await Playlist.deleteAll().exec();
    return {response: true, message: "All playlists deleted", data};
}