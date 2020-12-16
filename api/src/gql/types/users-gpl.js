import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";
import {
    comparePassword,
    createHash,
    createLoginToken,
    verifyAccess,
    GraphQLScalarDate,
} from "../../utils";

export class UserGQL {
    displayModel = new GraphQLObjectType({
        name: "userDisplayModel",
        type: "query",
        fields: {
            id: { type: GraphQLInt },
            firstName: { type: GraphQLString },
            lastName: { type: GraphQLString },
            fullName: { type: GraphQLString },
            email: { type: GraphQLString },
        },
    });

    resourceModel = new GraphQLObjectType({
        name: "resourceModel",
        type: "query",
        fields: {
            id: { type: GraphQLInt },
            name: { type: GraphQLString },
            permissions: { type: GraphQLList(GraphQLString) },
        },
    });

    roleModel = new GraphQLObjectType({
        name: "roleModel",
        type: "query",
        fields: {
            id: { type: GraphQLInt },
            name: { type: GraphQLString },
            resources: { type: GraphQLList(this.resourceModel) },
        },
    });

    loginModel = new GraphQLObjectType({
        name: "loginModel",
        type: "query",
        fields: {
            user: { type: this.displayModel },
            roles: { type: GraphQLList(this.roleModel) },
            token: { type: GraphQLString },
        },
    });

    model = new GraphQLObjectType({
        name: "user",
        type: "query",
        fields: {
            id: { type: GraphQLInt },
            firstName: { type: GraphQLString },
            lastName: { type: GraphQLString },
            email: { type: GraphQLString },
            createdBy: { type: this.displayModel },
            updatedBy: { type: this.displayModel },
            createdAt: { type: GraphQLScalarDate },
        },
    });

    queries = {
        all: () => ({
            type: new GraphQLList(this.model),
            args: {},
            resolve: async (input, args, context) => {
                verifyAccess(context.user, context.models.User.name);

                const data = await context.models.User.findAll({
                    where: {
                        active: true,
                    },
                    include: [
                        {
                            model: context.models.User,
                            as: "createdBy",
                            attributes: [
                                "id",
                                "firstName",
                                "lastName",
                                "email",
                            ],
                        },
                        {
                            model: context.models.User,
                            as: "updatedBy",
                            attributes: [
                                "id",
                                "firstName",
                                "lastName",
                                "email",
                            ],
                        },
                    ],
                });

                return data;
            },
        }),

        activeById: () => ({
            type: this.model,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (input, args, context) => {
                verifyAccess(context.user, context.models.User.name);

                const data = await context.models.User.findOne({
                    where: {
                        id: args.id,
                        active: true,
                    },
                });

                return data;
            },
        }),

        activeByEmail: () => ({
            type: this.model,
            args: {
                email: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (input, args, context) => {
                verifyAccess(context.user, context.models.User.name);
                const data = await context.models.User.findOne({
                    where: {
                        email: args.email,
                        active: true,
                    },
                });

                return data;
            },
        }),

        login: () => ({
            type: this.loginModel,
            args: {
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (input, args, context) => {
                const data = await context.models.User.findOne({
                    where: {
                        active: true,
                        email: args.email,
                    },
                    include: [
                        {
                            model: context.models.Role,
                            attibutes: ["id", "name"],
                            where: {
                                active: true,
                            },
                            include: [
                                {
                                    model: context.models.Resource,
                                    where: {
                                        active: true,
                                    },
                                    attributes: ["id", "name"],
                                    include: {
                                        model: context.models.Permission,
                                        where: {
                                            active: true,
                                        },
                                        attributes: ["id", "name"],
                                    },
                                },
                            ],
                        },
                    ],
                    attributes: [
                        "id",
                        "firstName",
                        "lastName",
                        "email",
                        "password",
                    ],
                });

                if (data && args.password && data.password) {
                    const valid = await comparePassword(
                        args.password,
                        data.password
                    );

                    if (!valid) return new Error("Invalid Password");

                    const _data = {
                        user: {
                            firstName: data.firstName,
                            lastName: data.lastName,
                            fullName: data.firstName + " " + data.lastName,
                            email: data.email,
                        },
                        roles: data.Roles.map((role) => {
                            return {
                                id: role.id,
                                name: role.name,
                                resources: role.Resources.map((res) => {
                                    return {
                                        id: res.id,
                                        name: res.name,
                                        permissions: res.Permissions.map(
                                            (perm) => {
                                                return perm.name;
                                            }
                                        ),
                                    };
                                }),
                            };
                        }),
                    };

                    _data.token = createLoginToken({
                        userId: data.id,
                        payload: _data.roles,
                    });

                    return _data;
                }

                return data;
            },
        }),
    };

    mutations = {
        create: () => ({
            type: this.model,
            args: {
                firstName: { type: GraphQLNonNull(GraphQLString) },
                lastName: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
                roleId: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (input, args, context) => {
                verifyAccess(context.user, context.models.User.name);
                const hashed = await createHash(args.password);

                const usrData = await context.models.User.create({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: hashed,
                    createdById: 1,
                    updatedById: 1,
                });

                if (usrData.id) {
                    const usrRole = await context.models.UserRole.create({
                        userId: usrData.id,
                        roleId: args.roleId,
                        createdById: context.user.userId,
                        updatedById: context.user.userId,
                    });
                }

                return usrData;
            },
        }),

        deactivate: () => ({
            type: this.model,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (input, args, context) => {
                verifyAccess(context.user, context.models.User.name);
                const data = await context.models.user.update({
                    active: false,
                    updateById: context.user.userId,
                    updatedAt: Date.now,
                    where: {
                        id: args.id,
                    },
                });

                return data;
            },
        }),

        changeUserRole: () => ({
            type: this.model,
            args: {
                userId: { type: GraphQLNonNull(GraphQLInt) },
                roleId: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (input, args, context) => {
                verifyAccess(context.user, context.models.User.name);
                const data = await context.models.UserRole.update({
                    roleId: args.roleId,
                    updatedById: context.user.userId,
                    updatedAt: Date.now,
                    where: {
                        userId: args.userId,
                    },
                });
            },
        }),

        resetPassword: () => ({
            type: this.model,
            args: {
                userId: { type: GraphQLNonNull(GraphQLInt) },
                password: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (input, args, context) => {
                const hashed = await createHash(args.password);
                const data = await context.models.User.update({
                    password: hashed,
                    updatedById: context.user.userId,
                    updatedAt: Date.now,
                    where: {
                        id: args.userId,
                    },
                });

                return data;
            },
        }),
    };
}

export default new UserGQL();
