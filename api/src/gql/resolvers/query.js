import { GraphQLObjectType, GraphQLString } from "graphql";
import User from "../types/users-gpl";

const Query = new GraphQLObjectType({
    name: "RootQuery",
    type: "Query",
    fields: () => ({
        health: {
            type: GraphQLString,
            resolve: () => "Hello",
        },
        users: User.queries.all(),
        userById: User.queries.activeById(),
        userByEmail: User.queries.activeByEmail(),
        login: User.queries.login(),
    }),
});

export default Query;
