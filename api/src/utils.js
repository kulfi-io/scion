import bcrypt from "bcrypt";
import dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import { GraphQLScalarType } from "graphql";

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
});

export const createHash = async (data) => {
    return await bcrypt.hash(data, parseInt(process.env.CRYPT_SALT));
};

export const comparePassword = async (password, hashed) => {
    return await bcrypt.compare(password, hashed);
};

export const createLoginToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET);
};

const getTokenPayload = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

export const getLoginTokenData = (req) => {
    if (req) {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace("Bearer ", "");
            if (!token) {
                throw new Error("No token found");
            }

            const data = getTokenPayload(token);

            return {
                userId: data.userId,
                role: data.payload.map((rol) => {
                    return {
                        id: rol.id,
                        name: rol.name,
                        resources: rol.resources.map((res) => {
                            return {
                                id: res.id,
                                name: res.name,
                                permissions: res.permissions.join(),
                            };
                        }),
                    };
                }),
            };
        }
    }

    throw new Error("Not Authenticated");
};

export const GraphQLScalarDate = new GraphQLScalarType({
    name: "GraphQLScalarDate",
    description: "Return date",
    parseValue: (data) => {
        return data;
    },
    serialize: (data) => {
        return new Date(Number(data));
    },
});

export const verifyAccess = (data, modelName) => {
    const result = getResource(data, modelName);
    if (!result.length)
        throw new Error(`User does not have access to resource`);

    return result;
};


const getResource = (data, modelName) => {
    return data.role[0].resources.filter(
        (x) => x.name === modelName
    );
};
