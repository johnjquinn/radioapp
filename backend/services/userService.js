const bcrypt = require('bcrypt');
const jsonschema = require('jsonschema');
const userRepo = require('../repository/userRepo');
const { BCRYPT_WORK_FACTOR } = require('../config');
const userRegisterSchema = require('../schemas/userRegisterSchema.json');
const userLoginSchema = require('../schemas/userLoginSchema.json');
const userProfileSchema = require('../schemas/userProfileSchema.json');
const userPasswordChangeSchema = require('../schemas/userPasswordChangeSchema.json');
const {createToken} = require('../util/tokens');

const registerUser = async payload => {
    const validated = validateSchema(payload, userRegisterSchema);
    if(!validated.response) return {response: false, errors: validated.errors};
    const found = await userRepo.getUserByUsername(payload.username);
    if(found) return {response: false, errors: `Username ${payload.username} already exists`};
    const encPassword = await bcrypt.hash(payload.password, BCRYPT_WORK_FACTOR);
    const playlists = [];
    const user = {
        username: payload.username,
        password: encPassword,
        name: payload.name,
        bio: "",
        email: payload.email,
        role: payload.role ? payload.role : "user",
        playlists,
    };
    const data = await userRepo.createUser(user);
    if(!data) return {response: false, errors: `Could not create username ${payload.username}`};
    return {response: true, message: "User created", data};
};

const loginUser = async payload => {
    const validated = validateSchema(payload, userLoginSchema);
    if(!validated.response) return {response: false, errors: validated.errors};
    const found = await userRepo.getUserByUsername(payload.username);
    if(!found) return {response: false, errors: `Username ${payload.username} doesn't exist`};
    if(!(await bcrypt.compare(payload.password, found.password))) return {response: false, errors: "Incorrect password"};
    const userToken = createToken(found);
    return {response: true, message: `Username ${found.username} logged in successfully`, userToken, user: found};
};

const editProfile = async payload => {
    const validated = validateSchema(payload, userProfileSchema);
    if(!validated.response) return {response: false, errors: validated.errors};
    const found = await userRepo.getUserByUsername(payload.username);
    if(!found) return {response: false, errors: `Username ${payload.username} doesn't exist`};
    found.name = payload.name,
    found.bio = payload.bio,
    found.email = payload.email;
    const data = await userRepo.updateUser(found._id, found);
    if(!data) return {response: false, errors: "Could not update user profile"};
    return {response: true, message: `Username ${found.username} profile updated`, data};
}

const changePassword = async payload => {
    const validated = validateSchema(payload, userPasswordChangeSchema);
    if(!validated.response) return {response: false, errors: validated.errors};
    if(payload.old_password && (await bcrypt.compare(payload.old_password, payload.new_password))) return {response: false, errors: "New password is same as old password"};
    const found = await userRepo.getUserByUsername(payload.username);
    if(!found) return {response: false, errors: `Username ${payload.username} doesn't exist`};
    found.password = await bcrypt.hash(payload.new_password, BCRYPT_WORK_FACTOR);
    const data = await userRepo.updateUser(found._id, found);
    if(!data) return {response: false, errors: "Could not change password"};
    return {response: true, message: "Password changed successfully", data};
}

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

const deleteAllUsers = async () => {
    const data = await userRepo.deleteAllUsers();
    return {response: true, message: "All users deleted", data};
};

const deleteUser = async id => {
    const data = await userRepo.deleteUser(id);
    if(!data) return {response: false, errors: `Could not delete user [${id}]`};
    return {response: true, message: `User [${id}] deleted`, data};
};

const validateSchema = (payload, schema) => {
    const validator = jsonschema.validate(payload, schema);
    if(!validator.valid){
        const errs = validator.errors.map(e => e.stack.substring(9));
        return {response: false, errors: errs};
    }
    return {response: true};
}


module.exports = {
    registerUser,
    loginUser,
    editProfile,
    changePassword,
    getAllUsers,
    getUser,
    getUserByUsername,
    deleteAllUsers,
    deleteUser
};