module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            createdBy: String,
            totalSeconds: String,
            songs: [
                {
                    title: String,
                    length: Number,
                    artist: [String],
                    album: String,
                    songID: String,
                    explicit: Boolean
                }
            ]
        },
        {timestamps: true}
    );
    const Playlist = mongoose.model("playlist", schema);
    return Playlist;
}