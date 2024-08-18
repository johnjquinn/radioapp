module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String,
            releaseDate: Date,
            artist: [String],
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
    );
    const Album = mongoose.model("album", schema);
    return Album;
};