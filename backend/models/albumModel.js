module.exports = mongoose => {
    const Album = mongoose.model(
        "album",
        mongoose.Schema(
            {
                title: String,
                releaseDate: Date,
                songs: [
                    {
                        title: String,
                        length: Number,
                        artist: [String],
                        discNum: Number,
                        trackNum: Number,
                        songID: String,
                        explicit: Boolean
                    }
                ]
            },
            {timestamps: true}
        )
    );
    return Album;
};