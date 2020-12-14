import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
});

export const createHash = async (data) => {
    return await bcrypt.hash(data, parseInt(process.env.CRYPT_SALT));
};
