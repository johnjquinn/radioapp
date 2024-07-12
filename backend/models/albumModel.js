module.exports = mongoose => {
    var schema = mongoose.Schema(
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
    );
    schema.method("toJSON", () => {
        const { __v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });
    const Album = mongoose.model("album", schema);
    return Album;
};