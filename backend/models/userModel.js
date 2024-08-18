module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            username: String,
            password: String,
        },
        {timestamps: true}
    );
    const User = mongoose.model("user", schema);
    return User;
}