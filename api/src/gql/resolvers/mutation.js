import { GraphQLObjectType } from "graphql";
import User from "../types/users-gpl";

const Mutation = new GraphQLObjectType({
    name: "RootMutation",
    type: "Query",
    fields: () => ({
        addUser: User.mutations.create(),
    }),
});

export default Mutation;
