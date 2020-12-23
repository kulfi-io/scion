import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
} from "graphql";
import {
    compareData,
    createHash,
    createLoginToken,
    GraphQLScalarDate,
    isValid,
    isValidSelf,
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
            isDefault: { type: GraphQLBoolean },
            resources: { type: GraphQLList(this.resourceModel) },
        },
    });

    roleDisplayModel = new GraphQLObjectType({
        name: "roleDisplayModel",
        type: "query",
        fields: {
            id: { type: GraphQLInt },
            name: { type: GraphQLString },
            isDefault: { type: GraphQLBoolean },
        },
    });

    loginModel = new GraphQLObjectType({
        name: "loginModel",
        type: "query",
        fields: {
            user: { type: this.displayModel },
            roles: { type: GraphQLList(this.roleModel) },
            token: { type: GraphQLString },
            requestor: { type: GraphQLString },
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
            verified: { type: GraphQLBoolean },
            createdBy: { type: this.displayModel },
            updatedBy: { type: this.displayModel },
            createdAt: { type: GraphQLScalarDate },
            updatedAt: { type: GraphQLScalarDate },
            roles: { type: GraphQLList(this.roleDisplayModel) },
        },
    });

    queries = {
        all: () => ({
            type: new GraphQLList(this.model),
            args: { requestor: { type: GraphQLNonNull(GraphQLString) } },
            resolve: async (input, args, context) => {
                await isValid({
                    user: context.user,
                    requestor: args.requestor,
                    model: context.models.User.name,
                });

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
                        {
                            model: context.models.Role,
                            where: {
                                active: true,
                            },
                            attributes: ["id", "name"],
                        },
                    ],
                });

                const _data = data.map((user) => {
                    return {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        verified: user.verified,
                        roles: user.Roles.map((role) => {
                            return {
                                id: role.id,
                                name: role.name,
                                isDefault: role.UserRole.isDefault,
                            };
                        }),
                        createdAt: user.createdAt,
                        createdBy: user.createdBy,
                        updatedAt: user.updatedAt,
                        updatedBy: user.updatedBy,
                    };
                });

                return _data;
            },
        }),

        activeById: () => ({
            type: this.model,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
                requestor: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (input, args, context) => {
                await isValid({
                    user: context.user,
                    requestor: args.requestor,
                    model: context.models.User.name,
                });

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
                requestor: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (input, args, context) => {
                await isValid({
                    user: context.user,
                    requestor: args.requestor,
                    model: context.models.User.name,
                });
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
                    attributes: [
                        "id",
                        "firstName",
                        "lastName",
                        "email",
                        "password",
                    ],
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
                });

                if (data && data.password && args.password) {
                    const valid = await compareData(
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
                                isDefault: role.UserRole.isDefault,
                                resources:
                                    role.UserRole.isDefault === true
                                        ? role.Resources.map((res) => {
                                              return {
                                                  id: res.id,
                                                  name: res.name,
                                                  permissions: res.Permissions.map(
                                                      (perm) => {
                                                          return perm.name;
                                                      }
                                                  ),
                                              };
                                          })
                                        : [],
                            };
                        }),
                    };

                    _data.requestor = await createHash(data.id);
                    _data.token = createLoginToken({
                        userId: data.id,
                        created: Date.now,
                        payload: {
                            selected: _data.roles.filter(
                                (x) => x.isDefault === true
                            ),
                            roles: _data.roles.filter(
                                (x) => x.isDefault === false
                            ),
                        },
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
                requestor: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (input, args, context) => {
                await isValid({
                    user: context.user,
                    requestor: args.requestor,
                    model: context.models.User.name,
                });
                const hashed = await createHash(args.password);

                // create user
                const data = await context.models.User.create({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: hashed,
                    createdById: context.user.userId,
                    updatedById: context.user.userId,
                });

                // Assign user role and set default
                if (data.id) {
                    // user role
                    const usrRole = await context.models.UserRole.create({
                        userId: data.id,
                        roleId: args.roleId,
                        isDefault: true,
                        createdById: context.user.userId,
                        updatedById: context.user.userId,
                    });
                }

                return data;
            },
        }),

        deactivate: () => ({
            type: this.model,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
                requestor: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (input, args, context) => {
                await isValid({
                    user: context.user,
                    requestor: args.requestor,
                    model: context.models.User.name,
                });

                const destroyed = await context.models.UserRole.destroy({
                    where: {
                        userId: args.id,
                    },
                });
                if (destroyed) {
                    const [
                        undatedNum,
                        updated,
                    ] = await context.models.User.update(
                        {
                            active: false,
                            updateById: context.user.userId,
                            updatedAt: Date.now,
                        },
                        {
                            where: {
                                id: args.id,
                            },
                            returning: true,
                            plain: true,
                        }
                    );

                    return updated;
                }

                return new Error("Deactivation Failure");
            },
        }),

        // communication module
        // user recieves an email with a reset password request
        // needs to be constructed
        // resetPassword: () => ({})

        changePassword: () => ({
            type: this.model,
            args: {
                requestor: { type: GraphQLNonNull(GraphQLString) },
                oldPassword: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: async (input, args, context) => {
                await isValidSelf({
                    user: context.user,
                    requestor: args.requestor,
                    model: context.models.User.name,
                });

                console.log("change-password");

                let data = await context.models.User.findOne({
                    attributes: ["id", "email", "password"],
                    where: {
                        id: context.user.userId,
                        active: true,
                    },
                });

                if (data) {
                    const valid = await compareData(
                        args.oldPassword,
                        data.password
                    );

                    if (!valid)
                        throw new Error("User or password is incorrect!");

                    const hashed = await createHash(args.password);

                    const [
                        updatedNum,
                        updated,
                    ] = await context.models.User.update(
                        {
                            password: hashed,
                            updatedById: context.user.userId,
                            updatedAt: Date.now,
                        },
                        {
                            where: {
                                id: data.id,
                            },
                            returning: true,
                            plain: true,
                        }
                    );

                    return updated;
                }

                return data;
            },
        }),
    };
}

export default new UserGQL();
