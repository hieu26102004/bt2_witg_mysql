import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

// Định nghĩa schema cho User
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    address: String,
    phoneNumber: String,
    gender: Boolean,
    roleId: String
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

let createNewUser = async (data) => {
    try {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        const user = new User({
            email: data.email,
            password: hashPasswordFromBcrypt,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender === '1' ? true : false,
            roleId: data.roleId
        });
        await user.save();
        return 'OK create a new user successfull';
    } catch (e) {
        throw e;
    }
};

let hashUserPassword = async (password) => {
    try {
        let hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    } catch (e) {
        throw e;
    }
};

let getAllUsers = async () => {
    try {
        let users = await User.find({}).lean();
        return users;
    } catch (e) {
        throw e;
    }
};

let getUserInfoById = async (userId) => {
    try {
        let user = await User.findById(userId).lean();
        return user || [];
    } catch (e) {
        throw e;
    }
};

let updateUser = async (data) => {
    try {
        let user = await User.findById(data.id);
        if (user) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            await user.save();
            let allusers = await User.find({});
            return allusers;
        } else {
            return;
        }
    } catch (e) {
        throw e;
    }
};

let deleteUserById = async (userId) => {
    try {
        await User.findByIdAndDelete(userId);
        return;
    } catch (e) {
        throw e;
    }
};

export default {
    createNewUser,
    getAllUsers,
    getUserInfoById,
    updateUser,
    deleteUserById
};
