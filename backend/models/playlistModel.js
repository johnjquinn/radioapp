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
    schema.method("toJSON", () => {
        const { __v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });
    const Playlist = mongoose.model("playlist", schema);
    return Playlist;
}