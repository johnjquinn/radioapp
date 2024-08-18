const db = require('../models');
const User = db.users;

const createUser = async uData => {
    const user = new User(uData);
    const data = await user.save();
    return data;
};

const getAllUsers = async () => {
    const data = await User.find({}).exec();
    return data;
}

const getUser = async id => {
    const data = await User.findById(id).exec();
    return data;
}

const getUserByUsername = async username => {
    const data = await User.findOne({username: username}).exec();
    return data;
}

const updateUser = async (id, newUser) => {
    const data = await User.findByIdAndUpdate(id, newUser, {useFindAndModify: false}).exec();
    return data;
}

const deleteAllUsers = async () => {
    const data = await User.deleteMany({}).exec();
    return data;
}

const deleteUser = async id => {
    const data = await User.findByIdAndDelete(id).exec();
    return data;
}

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    getUserByUsername,
    updateUser,
    deleteAllUsers,
    deleteUser
};