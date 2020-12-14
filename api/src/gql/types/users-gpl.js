import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";
import { createHash } from "../../util";

export class UserGQL {
    displayModel = new GraphQLObjectType({
        name: "userDisplayModel",
        type: "query",
        fields: {
            id: { type: GraphQLInt },
            firstName: { type: GraphQLString },
            lastName: { type: GraphQLString },
            email: { type: GraphQLString },
        },
    });

    accessModel = new GraphQLObjectType({
        name: "accessModel",
        type: "query",
        fields: {
            canEdit: { type: GraphQLBoolean },
            canCreate: { type: GraphQLBoolean },
            canDeactivate: { type: GraphQLBoolean },
            canApprove: { type: GraphQLBoolean },
        },
    });

    resourceModel = new GraphQLObjectType({
        name: "resourceModel",
        type: "query",
        fields: {
            id: { type: GraphQLInt },
            name: { type: GraphQLString },
            access: { type: this.accessModel },
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
            createdAt: { type: GraphQLString },
        },
    });

    queries = {
        all: () => ({
            type: new GraphQLList(this.model),
            args: {},
            resolve: async (input, args, context) => {
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
                            attributes: ["id", "name"],
                            where: {
                                active: true
                            },
                            include: {
                                model: context.models.Resource,
                            },
                        },
                    ],
                    attributes: ["id", "firstName", "lastName", "email"],
                });

                const _roles = data.Roles.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        resources: item.Resources.map((res) => {
                            return {
                                id: res.id,
                                name: res.name,
                                access: {
                                    canEdit: res.ResourceRole.canEdit,
                                    canCreate: res.ResourceRole.canCreate,
                                    canDeactivate:
                                        res.ResourceRole.canDeactivate,
                                    canApprove: res.ResourceRole.canApprove,
                                },
                            };
                        }),
                    };
                });

                const _data = {
                    user: {
                        id: data.id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                    },
                    roles: _roles,
                };

                return _data;
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
                        createdById: 1,
                        updatedById: 1,
                    });
                }

                return usrData;
            },
        }),

        deactivate: () => ({
            type: this.model,
            args: {
                userId: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (input, args, context) => {
                const data = await context.models.user.update({
                    active: false,
                    updateById: 1,
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
                const data = await context.models.UserRole.update({
                    roleId: args.roleId,
                    updatedById: 1,
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
                    updatedById: 1,
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
