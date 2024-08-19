module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            username: String,
            password: String,
            name: String,
            bio: String,
            email: String,
            role: String,
            playlists: [String]
        },
        {timestamps: true}
    );
    const User = mongoose.model("user", schema);
    return User;
}