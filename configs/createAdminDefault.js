import { hash } from "argon2"; 
import User from "../src/user/user.model.js"; 

export const createAdminDefault = async () => {
    try {
        const admin = await User.findOne({ role: "ADMIN_ROLE" });
        if (!admin) {
            const profilePicture = "pictAdmin.jpg";
            await User.create({
                name: "Emilio",
                surname: "Lux",
                username: "kernel",
                email: "emiliojo.lux@gmail.com",
                password: await hash("emLo06.20#"),
                role: "ADMIN_ROLE",
                phone: "54470765",
                profilePicture: profilePicture
            });
            console.log("Admin user created successfully");
        }
    } catch (err) {
        console.error("Error creating admin user:", err.message);
    }
};