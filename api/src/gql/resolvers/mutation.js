import { GraphQLObjectType } from "graphql";
import User from "../types/users-gpl";

const Mutation = new GraphQLObjectType({
    name: "RootMutation",
    type: "Mutation",
    fields: () => ({
        addUser: User.mutations.create(),
        deactivateUser: User.mutations.deactivate(),
        changePassword: User.mutations.changePassword(),
    }),
});

export default Mutation;
