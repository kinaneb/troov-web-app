import User from '../models/User.js';
import { comparePasswords } from '../utils/hashPassword.js';

const allUsers = async (req, res) => {
    try {
        const users = await User.find();
        const usersWithoutPassword = users.map(user => {
            return user.toObject();
        });
        res.json(usersWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
} // for an admin maybe

const getUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (user) {
            res.json(user.toObject());
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const userIsAlreadyRegistered = await User.findOne({username});
        if (userIsAlreadyRegistered) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const newUser = new User({ username, password });
        await user.save();
        res.status(201).json(newUser.toObject());
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (user) {
            Object.assign(user, req.body);
            const updatedUser = await user.save();

            res.json(updatedUser.toObject());
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (user) {
            await user.deleteOne();
            res.json({ message: 'User deleted' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const userLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({username}).select('+password');
        if (user) {
            const isPasswordValid = await comparePasswords(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            // TODO generate JWT
            res.json(user.toJSON());
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { allUsers, getUser, createUser, updateUser, deleteUser, userLogin};