import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT;
const CARTO_KEY = process.env.CARTO_KEY;
const BODY_SIZE_LIMIT = process.env.BODY_SIZE_LIMIT;

export {BASE_URL, PORT, BODY_SIZE_LIMIT, CARTO_KEY};
