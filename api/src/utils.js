import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { GraphQLScalarType } from "graphql";
import config from "../env.config";

/**
 * getReource
 * @param {Object} data // {user: user, model:model}
 * returns targeted resource for the selected role
 */
const getResource = (data) => {
    return data.user.selected[0].resources.filter((x) => x.name === data.model);
};

/**
 *
 * @param {string} token
 * return decrpted token value
 */
const getTokenPayload = (token) => {
    return jwt.verify(token, config.jwtSecret);
};

/**
 *
 * @param {object} data // {user: user, model:model}
 * return resource
 */
const verifyResourceAccess = (data) => {
    const result = getResource(data);
    if (!result.length)
        throw new Error(`User does not have access to resource`);

    return result;
};

/**
 *
 * @param {model} data // {user: user, model: model}
 * return managerial permissions
 */
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

/**
 *
 * @param {object} data // {user: user model: model}
 * returns self manage permissions
 */
const authorizedToManageSelf = (data) => {
    if (!data || !data.length) throw new Error("Not Authorized");

    const perms = data[0].permissions;

    if (perms.indexOf("canManageSelf") !== -1) {
        return true;
    }

    throw new Error("User is not authorized");
};

/**
 *
 * @param {string} data
 * retuns hash
 */
export const createHash = async (data) => {
    return await bcrypt.hash(data.toString(), parseInt(config.cryptSalt));
};

/**
 *
 * @param {string} data
 * @param {sting} hashed
 * returns compared value
 */
export const compareData = async (data, hashed) => {
    return await bcrypt.compare(data.toString(), hashed.toString());
};

/**
 *
 * @param {object|string} data
 * return token
 */
export const createLoginToken = (data) => {
    return jwt.sign(data, config.jwtSecret);
};

/**
 *
 * @param {object} req // request object
 * returns
 * {user: userId, selected: selected, roles:roles} as crypted tolen
 */
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

/**
 * GraphQLScalarDate
 * return graphQlObject for date datatype
 */
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

/**
 *
 * @param {object} data // {user: user, model:modelName}
 * checks to see if user is authorized
 * to alter resource
 * Return Boolean/Error
 */
export const isValid = async (data) => {
    if (!data || !data.user) throw new Error("Not Authenticated");

    const resource = verifyResourceAccess(data);
    return authorizedToManage(resource);
};

/**
 *
 * @param {object} data // {user: user, model:modelName}
 * checks to see if user is authorized
 * to maage self
 * Return Boolean/Error
 */
export const isValidSelf = async (data) => {
    if (!data || !data.user) throw new Error("Not Authenticated");

    /**
     * TODO log action to database
     * TODO force web app to alert as illegal action
     * TODO force web app to logout user
     * TODO reset tageted user
     * TODO notify admin and targeted user
     */

    if (data.user.userId !== data.targetUserId)
        throw new Error("Illegal Action");

    const resource = verifyResourceAccess(data);
    return authorizedToManageSelf(resource);
};

/**
 * TODO Create shared function for Illegal actions
 */
