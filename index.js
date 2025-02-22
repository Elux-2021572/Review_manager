import {config} from "dotenv";
import { initServer } from "./configs/server.js";
import { createAdminDefault } from ".configs/createAdminDefault.js";
import { createCategoryDefault } from "./configs/createCategoryDefault.js";


config();
initServer();
createAdminDefault();
createCategoryDefault();

