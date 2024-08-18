const bcrypt = require('bcrypt');
const jsonschema = require('jsonschema');
const userRepo = require('../repository/userRepo');
const { BCRYPT_WORK_FACTOR } = require('../config');
const userRegisterSchema = require('../schemas/userRegisterSchema.json');

const createUser = async payload => {
    const validated = validateRegister(payload);
    if(!validated.response) return {response: false, errors: validated.errors};
    const found = await userRepo.getUserByUsername(payload.username);
    if(found) return {response: false, errors: "Username already exists"};
    const user = {
        username: payload.username,
        password: await bcrypt.hash(payload.password, BCRYPT_WORK_FACTOR),
        name: payload.name,
        email: payload.email
    };
    const data = await userRepo.createUser(user);
    if(!data) return {response: false, errors: "Could not create user"};
    return {response: true, message: "User created", data};
};

const getAllUsers = async () => {
    const data = await userRepo.getAllUsers();
    return {response: true, message: "All users found", data};
}

const getUser = async id => {
    const data = await userRepo.getUser(id);
    if(!data) return {response: false, errors: `User [${id}] not found`};
    return {response: true, message: `User [${id}] found`, data};
};

const getUserByUsername = async username => {
    const data = await userRepo.getUserByUsername(username);
    if(!data) return {response: false, errors: `Username ${username} not found`};
    return {response: true, message: `Username ${username} found`, data};
};

const updateUser = async (id, payload) => {
    const validated = validateRegister(payload);
    if(!validated.response) return {response: false, errors: validated.error};
    const data = await userRepo.updateUser(id, newUser);
    if(!data) return {response: false, errors: `Could not update user [${id}]`};
    return {response: true, message: `User [${id}] updated`, data};
};

const deleteAllUsers = async () => {
    const data = await userRepo.deleteAllUsers();
    return {response: true, message: "All users deleted", data};
};

const deleteUser = async id => {
    const data = await userRepo.deleteUser(id);
    if(!data) return {response: false, errors: `Could not delete user [${id}]`};
    return {response: true, message: `User [${id}] deleted`, data};
};

const validateRegister = payload => {
    const validator = jsonschema.validate(payload, userRegisterSchema);
    if(!validator.valid){
        const errs = validator.errors.map(e => e.stack.substring(9));
        return {response: false, errors: errs};
    }
    return {response: true};
};

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    getUserByUsername,
    updateUser,
    deleteAllUsers,
    deleteUser
};