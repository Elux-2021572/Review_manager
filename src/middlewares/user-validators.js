import { body, param } from "express-validator";
import { emailExists, usernameExists, userExists, userUpdateProfile } from "../helpers/db-validators.js";
import { validateFields } from "./validate-fields.js"; 
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const registerValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("Password must be at least 8 characters long and contain at least one lowercase letter, one number, and one symbol"),
    validateFields, 
    deleteFileOnError,
    handleErrors
];

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Invalid email format"),
    body("username").optional().isString().withMessage("Username must be a string"),
    body("password").isLength({ min: 4 }).withMessage("Password must be at least 4 characters long"),
    validateFields, 
    handleErrors
];

export const updatePasswordValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param("uid").isMongoId().withMessage("Invalid MongoDB ID"),
    param("uid").custom(userExists),
    param("uid").custom(userUpdateProfile),
    body("newPassword").isLength({ min: 8 }).withMessage("New password must be at least 8 characters long"),
    validateFields, 
    handleErrors
];

export const updateUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param("uid", "Invalid ID").isMongoId(),
    param("uid").custom(userExists),
    param("uid").custom(userUpdateProfile),
    validateFields,
    handleErrors
];

export const updateProfilePictureValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    param("uid").isMongoId().withMessage("Invalid MongoDB ID"),
    param("uid").custom(userExists),
    param("uid").custom(userUpdateProfile),
    validateFields, 
    handleErrors
];