import bcrypt from "bcrypt";
import dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import { GraphQLScalarType } from "graphql";

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
});

const getResource = (data, modelName) => {
    return data.selected[0].resources.filter((x) => x.name === modelName);
};

const getTokenPayload = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

export const createHash = async (data) => {
    return await bcrypt.hash(data, parseInt(process.env.CRYPT_SALT));
};

export const comparePassword = async (password, hashed) => {
    return await bcrypt.compare(password, hashed);
};

export const createLoginToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET);
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
                selected: data.payload.selected.map((sel) => {
                    return {
                        id: sel.id,
                        name: sel.name,
                        isDefault: sel.isDefault,
                        resources: sel.resources.map((res) => {
                            return {
                                id: res.id,
                                name: res.name,
                                permissions: res.permissions.join(),
                            };
                        }),
                    };
                }),
                roles: data.payload.roles,
            };
        }
    }
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
    if (!data) throw new Error("Not Authenticated");

    const result = getResource(data, modelName);
    if (!result.length)
        throw new Error(`User does not have access to resource`);

    return result;
};

export const authorizedToManage = (data) => {
    if (!data || !data.length) throw new Error("Not Authorized");

    const perms = data[0].permissions;

    if (
        perms.indexOf("canManage") !== -1 ||
        perms.indexOf("canManageAccrossAll") !== -1
    ) {
        return true;
    }

    throw new Error("User is not authorized");
};

export const targetIsSelf = (data) => {
    if (!data.userId || !data.target) throw new Error("Bad data");

    if (data.userId !== data.target) throw new Error("Unauthorized action");

    return true;
};
