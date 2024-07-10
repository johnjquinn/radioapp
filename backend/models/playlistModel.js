module.exports = mongoose => {
    const Playlist = mongoose.model(
        "playlist",
        mongoose.Schema(
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
        )
    );
    return Playlist;
}