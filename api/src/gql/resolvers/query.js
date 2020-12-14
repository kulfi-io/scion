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
        login: User.queries.login(),
    }),
});

export default Query;
