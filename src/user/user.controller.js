import { hash, verify } from "argon2";
import User from "./user.model.js";
import fs from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const updatePassword = async (req, res) => {
    try {
        const { uid } = req.params;
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const concurrentPassword = await verify(user.password, oldPassword);
        if (!concurrentPassword) {
            return res.status(400).json({
                success: false,
                message: 'The current password is incorrect'
            });
        }

        const oldAndNewPassword = await verify(user.password, newPassword);
        if (oldAndNewPassword) {
            return res.status(400).json({
                success: false,
                message: 'The new password cannot be the same as the previous one'
            });
        }

        const encryptedPassword = await hash(newPassword);
        await User.findByIdAndUpdate(uid, { password: encryptedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error updating password",
            error: err.message
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const { username, ...data } = req.body;

        if (username) {
            const existingUser = await User.findOne({ username });
            if (existingUser && existingUser._id.toString() !== uid) {
                return res.status(400).json({
                    success: false,
                    message: "Username already exists"
                });
            }
            data.username = username;
        }

        const updatedData = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user: updatedData,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: err.message
        });
    }
};

export const updateProfilePicture = async (req, res) => {
    try {
        const { uid } = req.params;
        let newProfilePicture = req.file ? req.file.filename : null;

        if (!newProfilePicture) {
            return res.status(400).json({
                success: false,
                message: 'No new profile picture provided',
            });
        }

        const user = await User.findById(uid);

        if (user.profilePicture) {
            const oldProfilePicturePath = join(__dirname, "../../public/uploads/profile-pictures", user.profilePicture);
            await fs.unlink(oldProfilePicturePath);
        }

        user.profilePicture = newProfilePicture;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile picture updated successfully',
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error updating profile picture',
            error: err.message
        });
    }
};

