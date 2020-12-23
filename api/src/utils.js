import bcrypt from "bcrypt";
import dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import { GraphQLScalarType } from "graphql";

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
});

const getResource = (data) => {
    return data.user.selected[0].resources.filter((x) => x.name === data.model);
};

const getTokenPayload = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

const verifyResourceAccess = (data) => {
    const result = getResource(data);
    if (!result.length)
        throw new Error(`User does not have access to resource`);

    return result;
};

const authorizedToManage = (data) => {
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

const authorizedToManageSelf = (data) => {
    if (!data || !data.length) throw new Error("Not Authorized");

    const perms = data[0].permissions;

    if (perms.indexOf("canManageSelf") !== -1) {
        return true;
    }

    throw new Error("User is not authorized");
};

export const createHash = async (data) => {
    return await bcrypt.hash(data.toString(), parseInt(process.env.CRYPT_SALT));
};

export const compareData = async (data, hashed) => {
    return await bcrypt.compare(data.toString(), hashed.toString());
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

export const isValid = async (data) => {
    if (!data || !data.user) throw new Error("Not Authenticated");

    if (!data.requestor) throw new Error("Invalid Requestor");

    if (await compareData(data.user.userId, data.requestor)) {
        const resource = verifyResourceAccess(data);
        return authorizedToManage(resource);
    }

    throw new Error("Unauthorized Requestor");
};

export const isValidSelf = async (data) => {
    if (!data || !data.user) throw new Error("Not Authenticated");

    if (!data.requestor) throw new Error("Invalid Requestor");

    if (await compareData(data.user.userId, data.requestor)) {
        const resource = verifyResourceAccess(data);
        return authorizedToManageSelf(resource);
    }

    throw new Error("Unauthorized Requestor");
};
